
const axios = require('axios');
const cheerio = require('cheerio');

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
        console.log($(el).text());
    });
    const xx = $('#all_line_score').children('#table_container is_setup')
    // const xx = $('#all_line_score').children('.table_container')
    console.log(xx.html());
    // const z = $('div[id="line_score_sh"]').children().each((i,el)=>{
    //     console.log($(el).html());
    // });
    // const za = $('div[id="line_score_sh"]').children().find('tbody').each( (i,el) => {
    //     const zz=$(el).children().find('table')
    //     console.log("HI",i,zz.html());
    //     // console.log($(el).text());
    //     // console.log("HI");
    // });
    // console.log(yyy.html());
    // console.log(y.html());
    // console.log(yy.html());
    // console.log(yya.html());
    // console.log(zb.html());
    // console.log(zc.html());
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
            if(i<3){
                const str = $(el).attr('href');
                if(str.includes('boxscores')){
                    scrapeBoxScore(`https://www.basketball-reference.com/${str}`);
                    console.log(i,str);
                }
            }
        });
        // console.log(y.html());

        
        // $tmps = $('.crayons-story__author-pic');
        // const go=tmps.html();
        // console.log(go);
    
    } catch(err){
        console.log(err.message);
    }
}

scrape();