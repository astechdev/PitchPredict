//global chart variable for dynamically loading charts of all kinds
//each chart defines its own var data and var options
var chart;
var phonegap = 'false';
var gAppID = '263545480387259';
var googleAnalyticsInitialized = 'false';
var gaPlugin;
var _gaq = _gaq || [];
var gaAccount = 'UA-29743249-1';
var gaDomianName = 'pitchpredict.com';
var chartClicks = 0;
var numberOfChartClicksBeforeShowAds = 5;
var inmobi_conf;
var youTubePlayList = 'PL9C5815B418D1508E';
var youTubePlayListIndex = 1;
var youTubePlayListLength = 7;
////var anyOutcomeType = "ANY";
//var anyPitchType = "ANY";
var userInfoMap = { "UserName": null, "Email": null,  "AdvertisingThreshold": null};
var stateVariablesMap = {
    "theUserName":"",
    "thePassword":"",
    "theAwayTeamId":"0",
    "theAwayTeamName":"Select Team",
    "theAwayTeamAbbr":"",
    "theAwayTeamScore":"0",
    "theHomeTeamId":"0",
    "theHomeTeamName":"Select Team",
    "theHomeTeamAbbr":"",
    "theHomeTeamScore":"0",
    "theBalls":"0",
    "theStrikes":"0",
    "theOuts":"0",
    "thePitcherId":"0",
    "thePitcherName":"Select Pitcher",
    "thePitcherTeamId":"0",
    "thePitcherTeamName":"",
    "thePitcherTeamAbbr":"",
    "theCatcherId":"0",
    "theCatcherName":"Select Catcher",
    "theBatterId":"0",
    "theBatterName":"Select Batter",
    "theBatterRightOrLeft":"R",
    "theBatterTeamId":"0",
    "theBatterTeamName":"",
    "theBatterTeamAbbr":"",
    "theBatterOnDeckId":"0",
    "theBatterOnDeckName":"Select Batter",
    "theOn1bId":"0",
    "theOn1bName":"Select Base Runner",
    "theOn2bId":"0",
    "theOn2bName":"Select Base Runner",
    "theOn3bId":"0",
    "theOn3bName":"Select Base Runner",
    "thePitchTypeSequence":[],
    "thePitchLocationSequence":[],
    "thePitchOutcomeSequence":[],
    "theHomeTeamBattingOrderBatterIds":["0","0","0","0","0","0","0","0","0"],
    "theAwayTeamBattingOrderBatterIds":["0","0","0","0","0","0","0","0","0"],
    "theInning":"1",
    "theTopOrBottomHalf":"TOP",
    "thePitcherOrBatter":"PITCHER",
    "theBaseRunnerType":"EXACT",
    "thePitcherType":"EXACT",
    "theCatcherType":"EXACT",
    "theBatterType":"EXACT",
    "theOnDeckBatterType":"EXACT",
    "theOutcomeType":"ANY",
    "thePitchType":"ANY",
    "theHotZone":"ANY",
    "theAtBatNumber":"ANY",
    "theYearToQuery":"2009"} ;
var teamsMap = {};
var homeTeamMap = {};
var awayTeamMap = {};
var offenseTeamMap = {};
var defenseTeamMap = {};
var pitchTypesMap = {};
var pitchOutcomesMap = {};
var pitchLocationsMap = {};
var currentchart = "";
var chartheight = ($(window).height()*.75);
var chartwidth = chartheight*1.43;
var dialogheight = $(window).height()*.75;
var dialogwidth = $(window).width()*.80;
var scoreboardHelp = "The game scenario assigns the home and away teams as well "+
"as the season so that Pitch Predict can populate the players for each team "+
"accordingly.<br><br>The game scenario also keeps track of the counts and "+
"number of outs.";
var teamlineupHelp = "The team line ups assign the batting order for the home "+
"and away teams defined in the game scenario section.<br><br>This enables "+
"Pitch Predict to automatically keep track of who's on deck.";
var fieldHelp = "The game situation describes the pitcher, catcher, batter, and "+
"runners on base.<br><br>Pitch Predict tracks every pitch thrown in the MLB and tracks "+
"who is pitching, who is catching, who is hitting, who is on deck, and who is on "+
"base during every pitch.  Then we make this capability an "+
"option for our users.<br><br>Use the filters section to turn the game situation "+
"capabilities \"on\" or \"off\".  This information must be set, but the user can choose which "+
"of these \"game characteristics\" are important to them.";
var pitchsequenceHelp = "The pitch sequence is one of the key features of Pitch "+
"Predict.  Everone who has ever played or watched a baseball game knows that "+
"each pitch is thrown with a purpose.  It's either thrown as an out pitch, or "+
"it's thrown to setup a different pitch later on in the at bat or even later in the game "+
"for that matter.<br><br>Pitch Predict tracks every pitch thrown in the MLB and tracks "+
"the pitches thrown leading up to that pitch.  Then we make this capability an "+
"option for our users.  Use the filters section to turn the pitch sequence "+
"capabilities \"on\" or \"off\".";
var filtersHelp = "This sections presents the real power of Pitch Predict.  "+
"The filters allow the user to determine and define what "+
"characteristics of the game they feel is essential to understanding the given "+
"game situation.<br><br>Use these filters to choose between looking at the pitcher's "+
"data or the batter's data.  Filter out all pitches except the one pitch type "+
"you are interested in.  Filter out the outcomes if you are looking for a "+
"particular one.  You can even determine if you want to examine a particular "+
"pitcher, catcher, batter, on deck batter, or base runner; or if you just want "+
"to examine a game situation for any of these.  What's more is you can choose "+
"any, all, or anywhere in between.  Pitch Predict does not confine our users "+
"to analyzing data our way, rather we allow you to determine what is important in "+
"your analysis.";
var hotzoneHelp = "The hot zone gives a pitcher's or batter's percentage of "+
"success in a given zone for the current game scenario, game situation, pitch "+
"sequence, and set of filters.<br><br>You can further analyze the data by "+
"clicking on a hot zone.  You will see that the chart will update as a filter "+
"for the zone you just clicked is applied.  This is a great way to start off "+
"analyzing a pitcher's or batter's overall performance in the strike zone and "+
"then really concentrate on examining what the pitcher or batter does well for "+
"a particular area of the strike zone.<br><br>When you click on a zone you will "+
"also see the hot zone \"tracker\" updates to let you know what zone you are "+
"currently analyzing while still allowing you to view the overall performance "+
"of the player within the strike zone.  To turn a particular zone \"off\" all "+
"you need to do is click on the \"Hotzone Overview\" button.";
var pitchpredictHelp = "The Pitch Predict Web App is a baseball analytics tool that data mines MLB's free "+
"gameday XML and builds an interface that enables users to analyze possible outcomes "+
"of a given situation. PitchPredict has a singular api that allows other developers "+
"to hook into via ajax and create there own widgets/charts and graphs for study. "+
"It's target audience is baseball fans and stat enthusiasts.";
//var pitchTypeSequenceArray = new Array();
//var pitchLocationSequenceArray = new Array();
//var pitchOutcomeSequenceArray = new Array();
//var inning;
//var toporbottomhalf;
//var balls;
//var strikes;
//var outs;
//var awayteamname;
//var awayteamscore;
//var hometeamname;
//var hometeamscore;
//var pitcherteamname;
//var pitchername;
//var catchername;
//var hitterteamname;
//var hittername;
//var hitterrightorleft;
//var hitterondeckname;
//var atbatnumber;
//var yeartoquery;
//var runneronfirst;
//var runneronsecond;
//var runneronthird;
var params;
//var homeTeamLineupArray;
//var awayTeamLineupArray;
//var pitchtype = "ANY";
//var outcometype = "ANY";
//Acceptable values for the following var's: "ANY", "SIMILAR", or "EXACT"
var pitchertype = ["EXACT", "ANY"];
var catchertype = ["EXACT", "ANY"];
var battertype = ["EXACT", "ANY"];
var batterondecktype = ["EXACT", "ANY"];
var baserunnertype = ["EXACT", "ANY"];
var toporbottomhalf = ["TOP", "BOTTOM", "ANY"];
var hitterrightorleft = ["R", "L", "ANY"];
//Acceptable values for the following var's: "PITCHER" or "BATTER"
var pitcherorbatter = ["PITCHER", "BATTER"];
//Acceptable values for the hotzone var: is any of the following zone* var's'
//var hotzone = "ANY";
var zoneAny = "ANY";
var zone1 = "ZONE 1";
var zone2 = "ZONE 2";
var zone3 = "ZONE 3";
var zone4 = "ZONE 4";
var zone5 = "ZONE 5";
var zone6 = "ZONE 6";
var zone7 = "ZONE 7";
var zone8 = "ZONE 8";
var zone9 = "ZONE 9";
var zone10 = "ZONE 10";
var zone11 = "ZONE 11";
var zone12 = "ZONE 12";
var zone13 = "ZONE 13";
var zone14 = "ZONE 14";
//var defaultWaitTime = 250; //time in milliseconds
//var defaultSetTimeoutWaitTime = 750; //time in milliseconds