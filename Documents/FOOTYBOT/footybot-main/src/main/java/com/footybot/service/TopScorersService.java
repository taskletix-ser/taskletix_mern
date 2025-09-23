// src/main/java/com/footybot/service/TopScorersService.java
package com.footybot.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.footybot.model.Goal;
import com.footybot.model.Team;
import com.footybot.model.TopScorerDTO;
import com.footybot.repository.GoalRepository;

@Service
public class TopScorersService {

    private final GoalRepository goalRepository;
    private final PlayerDataService playerDataService;

    public TopScorersService(GoalRepository goalRepository, PlayerDataService playerDataService) {
        this.goalRepository = goalRepository;
        this.playerDataService = playerDataService;
    }

    public List<TopScorerDTO> getTopScorers() {
        // 1. Get all goals from the database
        List<Goal> allGoals = goalRepository.findAll();
        
        // 2. Get team crests for easy lookup
        Map<String, String> teamCrests = playerDataService.getAllTeams().stream()
            .collect(Collectors.toMap(Team::getName, Team::getCrest, (a, b) -> a));

        // 3. Group goals by player name and count them
        Map<String, Long> goalsByPlayer = allGoals.stream()
            .collect(Collectors.groupingBy(Goal::getPlayerName, Collectors.counting()));
            
        // 4. Create a list of DTOs
        List<TopScorerDTO> topScorers = new ArrayList<>();
        for (Map.Entry<String, Long> entry : goalsByPlayer.entrySet()) {
            TopScorerDTO dto = new TopScorerDTO();
            dto.setPlayerName(entry.getKey());
            dto.setGoals(entry.getValue().intValue());
            
            // Find the player's team and crest
            allGoals.stream()
                .filter(g -> g.getPlayerName().equals(entry.getKey()))
                .findFirst()
                .ifPresent(g -> {
                    dto.setPlayerTeam(g.getPlayerTeam());
                    dto.setCrestUrl(teamCrests.get(g.getPlayerTeam()));
                });
            
            topScorers.add(dto);
        }

        // 5. Sort the list by goals (descending)
        topScorers.sort(Comparator.comparingInt(TopScorerDTO::getGoals).reversed());

        // 6. Assign ranks
        for (int i = 0; i < topScorers.size(); i++) {
            topScorers.get(i).setRank(i + 1);
        }

        return topScorers;
    }
}