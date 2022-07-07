
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs')

async function scrapeBoxScore (str) {
    console.log("BYE",str);
    const text = await axios.get(str);
    console.log(str);
    const $ = cheerio.load(text.data);


    // const x = $('div[id="div_line_score"]');
    // const y = $('div[id="line_score_sh"]'); //WORKS
    // const yy = $('div[id="div_line_score"]').first();
    // const yyy = $('#all_line_score').find('.div_line_score');
    // const yya = $('table[id="line_score"]').first();
    // const zb = $('.suppress_all stats_table');
    const nn=$('#div_line_score');
    console.log(nn.html());

    // const x = $('#all_line_score');
    // console.log(x.html());
    const xy = $('#all_line_score').each((i,el)=>{
        console.log("ASDAS");
        // console.log($(el).html());
        // console.log("RN",$(el).html());
        TMPX = ($(el).html());
        
        // TMPX.toString().map
        scoreArr = [];
        cur = "";
        last = -1;
        for (let i in TMPX.toString()) {
            Tchar = TMPX[i];
            if (Tchar >='0' && Tchar <='9'){
                // console.log(i,Tchar);
                if(last != i-1){
                    if(cur.length>1 && cur!="2022" && cur!=="2021"){
                        scoreArr.push(cur);
                    }
                    cur = "";
                }
                cur += TMPX[i];
                last = i;
            }
        }

        sum3 = parseInt(scoreArr[0])+parseInt(scoreArr[1])+parseInt(scoreArr[2]);
        sum4 = parseInt(scoreArr[4]);
        sum32 = parseInt(scoreArr[5])+parseInt(scoreArr[6])+parseInt(scoreArr[7]);
        sum42 = parseInt(scoreArr[5])+parseInt(scoreArr[6])+parseInt(scoreArr[7])+parseInt(scoreArr[8]);
        // dataS = sum3.toString()+sum4+sum32+sum42;
        qdiff = Math.abs(sum3-sum32);
        q4Diff = (sum3>sum32? sum4-sum42: sum42-sum4);
        isWin = q4Diff>0;
        dataS = [sum3,sum4,sum32,sum42, qdiff, q4Diff, isWin];
        writeStream.write(dataS.join(',')+ '\n', () => {
            // a line was written to stream
        })
    });
}
async function scrape () {
    try {
        const text = await axios.
            get('https://www.basketball-reference.com/leagues/NBA_2022_games.html');
            // get('http://paulgraham.com/heresy.html');
            // get('http://dev.to');
        
        const $ = cheerio.load(text.data);
    
        // $firstImageWithAlt = $('img[alt]').first();
        // const title = $firstImageWithAlt.toArray()[0].attribs.alt;
    
        // console.log(title);
        // const x = $('.crayons-story__author-pic')
        // console.log(x.html());

        const x = $('.table_container');
        const y = $('.table_container').children();
        const z =  $('.table_container').children().find('tbody').each( (i,el) => {
            // console.log("HI");
            // console.log($(el).text());
        });
        const za =  $('.table_container').children().find('tbody').find('tr').each( (i,el) => {
            // console.log("HI");
            // console.log($(el).children().text());
        });
        const zb =  $('.table_container').children().find('tbody').find('tr').find('th').find('a').each( (i,el) => {
            // console.log("HI");
            // console.log($(el).attr('href'));
        });
        const zc =  $('.table_container').children().find('tbody').find('tr').find('td').find('a').each( (i,el) => {
            // if(i<3){
                const str = $(el).attr('href');
                if(str.includes('boxscores')){
                    scrapeBoxScore(`https://www.basketball-reference.com/${str}`);
                    console.log(i,str);
                }
            // }
        });
        // console.log(y.html());

        
        // $tmps = $('.crayons-story__author-pic');
        // const go=tmps.html();
        // console.log(go);
    
    } catch(err){
        console.log(err.message);
    }
}

let writeStream = fs.createWriteStream('./dataRet.csv')


dataS = ["Team 1 Q3", "Team 1 Total", "Team 2 Q3", "Team 2 Total"];
writeStream.write(dataS.join(',')+ '\n', () => {
    // a line was written to stream
})
scrape();
// writeStream.end();