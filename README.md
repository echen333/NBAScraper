# NBAScraper

NBAScraper uses data from https://www.basketball-reference.com and compiles it to find at what point differential in an nba game can we be confident in the winner.

![nbaAllPoints](https://user-images.githubusercontent.com/43014804/177703426-774f8503-f05f-427d-b91a-9cc8e2aee33d.png)

![nbaChance2](https://user-images.githubusercontent.com/43014804/177703436-011cc651-0521-4701-8c26-d95cc29a8436.png)

![NBAloggerPro](https://user-images.githubusercontent.com/43014804/178334697-abed29a4-f003-4bdf-9390-800ebad4766b.png)

Some analysis:
 - 0.94 correlation is a lot larger than expeected, 
 - small single digit point differentials is a ~65% win rate
 - at a ten point differential, 90% confidence and very hard to come back from
 - fitted data at least shows 50% win rate with 0 point differential
 - ESPN's win probability graph shows a lot more fluctuation
   - [2022 NBA Finals Game 3](https://www.espn.com/nba/game/_/gameId/401442532), 2 point difference => 76% win rate
