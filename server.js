
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs')

async function scrapeBoxScore (str) {
    try {
        const text = await axios.get(str);
        console.log(str);
        const $ = cheerio.load(text.data);
    
    
        const xy = $('#all_line_score').each((i,el)=>{
            TMPX = ($(el).html());
            
            scoreArr = [];
            cur = "";
            last = -1;
            for (let i in TMPX.toString()) {
                Tchar = TMPX[i];
                if (Tchar >='0' && Tchar <='9'){
                    if(last != i-1){
                        if(cur.length>1 && cur!="2022" && cur!=="2021"){
                            scoreArr.push(parseInt(cur));
                        }
                        cur = "";
                    }
                    cur += TMPX[i];
                    last = i;
                }
            }
            scoreArr.push(parseInt(cur));
    
            sum3 = scoreArr[0]+(scoreArr[1])+(scoreArr[2]);
            sum4 = scoreArr[4];
            sum32 = scoreArr[5]+(scoreArr[6])+(scoreArr[7]);
            sum42 = scoreArr[9];

            if(scoreArr.length===12){
                console.log("OT");
                return;
            }
            qdiff = Math.abs(sum3-sum32);
            q4Diff = (sum3>sum32? sum4-sum42: sum42-sum4);
            isWin = q4Diff>0;
            dataS = [sum3,sum4,sum32,sum42, qdiff, q4Diff, isWin];
            writeStream.write(dataS.join(',')+ '\n', () => {
                // a line was written to stream
            })

        });
    } catch (error) {
        console.log("ERROR@", str);
    }
}
async function scrape (year, month) {
    try {
        const text = await axios.
            // get('https://www.basketball-reference.com/leagues/NBA_2022_games.html');
            get(`https://www.basketball-reference.com/leagues/NBA_${year}_games-${month}.html`);
        
        const $ = cheerio.load(text.data);
    
        const zc =  $('.table_container').children().find('tbody').find('tr').find('td').find('a').each( (i,el) => {
            if(i<300){
                const str = $(el).attr('href');
                if(str.includes('boxscores')){
                    scrapeBoxScore(`https://www.basketball-reference.com${str}`);
                    console.log(i,str);
                }
            }
        });
    } catch(err){
        console.log(err.message);
    }
}

async function scrapeAll( yearLb, yearUb){
    const months = ['october', 'november', 'december', 'january', 'february', 'march', 'april', 'may', 'june']
    // const months = ['november','october','december']
    for (let i=yearLb;i<=yearUb;i++){
        for (let j=0;j<months.length;j++){
            scrape(i, months[j]);
        }
    }
    console.log("Success")

}
let writeStream = fs.createWriteStream('./dataRet.csv')
scrapeAll(2022,2022);
// writeStream.end();