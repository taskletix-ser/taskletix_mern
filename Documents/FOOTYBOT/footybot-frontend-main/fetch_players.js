// A simple and reliable script to fetch player data for multiple teams.

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// --- ⚙️ CONFIGURATION ---
const TEAM_NAMES = [
    "Arsenal", "Aston Villa", "Bournemouth", "Brentford", "Brighton",
    "Chelsea", "Crystal Palace", "Everton", "Fulham", "Ipswich Town",
    "Leicester", "Liverpool", "Man City", "Manchester United", "Newcastle",
    "Nottingham Forest", "Southampton", "Tottenham", "West Ham", "Wolves"
]; 

const JSON_OUTPUT_PATH = '../footybot-main/src/main/resources/players.json';
const IMAGE_OUTPUT_PATH = './public/images';
// --- END OF CONFIGURATION ---


async function downloadImage(url, filepath) {
    if (!url) return;
    const previewUrl = url + '/preview';
    try {
        const writer = fs.createWriteStream(filepath);
        const response = await axios({ url: previewUrl, method: 'GET', responseType: 'stream' });
        response.data.pipe(writer);
        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    } catch (error) {
        console.error(`  -> Failed to download image from ${previewUrl}`);
    }
}

async function fetchAllTeams() {
    console.log(`🚀 Starting to fetch players for ${TEAM_NAMES.length} teams...`);
    
    let allPlayersForJson = [];

    if (!fs.existsSync(IMAGE_OUTPUT_PATH)) {
        fs.mkdirSync(IMAGE_OUTPUT_PATH, { recursive: true });
    }

    for (const teamName of TEAM_NAMES) {
        console.log(`\n---\nFetching players for: "${teamName}"`);
        const encodedTeamName = encodeURIComponent(teamName);
        const apiUrl = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?t=${encodedTeamName}`;

        try {
            const apiResponse = await axios.get(apiUrl);
            if (!apiResponse.data || !apiResponse.data.player) {
                console.warn(`⚠️ No players found for "${teamName}". Skipping.`);
                continue;
            }

            const playersFromApi = apiResponse.data.player;
            
            const teamFolderName = teamName.toLowerCase().replace(/\s+/g, '-');
            const teamImageFolder = path.join(IMAGE_OUTPUT_PATH, teamFolderName);
            if (!fs.existsSync(teamImageFolder)) {
                fs.mkdirSync(teamImageFolder, { recursive: true });
            }

            for (const player of playersFromApi) {
                const simpleName = player.strPlayer.toLowerCase().replace(/[^a-z0-9]/g, '-');
                const imageFileName = `${simpleName}.jpg`;
                const localImagePath = path.join(teamImageFolder, imageFileName);

                if (player.strThumb) {
                    await downloadImage(player.strThumb, localImagePath);
                }

                const playerObject = {
                    id: player.idPlayer,
                    name: player.strPlayer,
                    position: player.strPosition,
                    team: player.strTeam,
                    photoUrl: `/images/${teamFolderName}/${imageFileName}`,
                    nationality: player.strNationality,
                    number: player.strNumber || 0
                };
                allPlayersForJson.push(playerObject);
            }
             console.log(`✅ Processed ${playersFromApi.length} entries for ${teamName}.`);
        } catch (error) {
            console.error(`❌ ERROR fetching data for "${teamName}".`);
        }
    }
    
    console.log(`\n---\n💾 Writing a total of ${allPlayersForJson.length} players to players.json file...`);
    fs.writeFileSync(JSON_OUTPUT_PATH, JSON.stringify(allPlayersForJson, null, 2));

    console.log("✨ All done! Your complete players.json file and all images have been created.");
}

fetchAllTeams();

