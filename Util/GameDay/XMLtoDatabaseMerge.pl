#! /usr/bin/perl
 
# This script is made freely available for non-commerical use by Mike Fast
# September 2011
# http://fastballs.wordpress.com/
# Attribution is appreciated but not required.
#
# This script uses portions of Joseph Adler's code from hack_28_parser.pl
# as published by O'Reilly Media in the book Baseball Hacks, copyright 2006
# ISBN 0-596-00942-9, available at http://www.oreilly.com/catalog/baseballhks/
# used under the terms set forth in the book on Page xvi, as follows:
# "In general, you may use the code in this book in your programs and documentation.
# You do not need to contact us for permission unless you're reproducing a significant
# portion of the code.  For example, writing a program that uses several chunks of code
# from this book does not require permission."
#
# Some code portions are by Joseph Adler
# and the rest of the code is largely or completely by Mike Fast
 
use Switch;
 
# MySQL database connection statement
use DBI;
$dbh = DBI->connect("DBI:mysql:database=pitchpre_pbp_2009;host=localhost", 'pitchpre_pbp', 'Sheffield11') 
or die $DBI::errstr;
 
# Set base directory for XML game data download URL
$year = 2009;
$basedir = "./games/year_$year";
 
# Define XML objects
use XML::Simple;
$boxparser= new XML::Simple(ForceArray => 1,
                            KeepRoot => 1,
                            KeyAttr => 'boxscore');

$inningparser= new XML::Simple(ForceArray => 1,
                                KeepRoot => 1,
                                KeyAttr => 'inning');

$hitsparser= new XML::Simple(ForceArray => 1,
                                KeepRoot => 1,
                                KeyAttr => 'hitchart');

$playerparser= new XML::Simple(ForceArray => 1,
                                KeepRoot => 1,
                                KeyAttr => 'game');

$teamparser= new XML::Simple(ForceArray => 1,
                                KeepRoot => 1,
                                KeyAttr => 'game');

$gameparser= new XML::Simple(ForceArray => 1,
                                KeepRoot => 1,
                                KeyAttr => 'game');

my $logdir="/home1/pitchpre/public_html/PitchPredict/Util/GameDay/";
sub logit
{
    my $s = shift;
    my ($logsec,$logmin,$loghour,$logmday,$logmon,$logyear,$logwday,$logyday,$logisdst)=localtime(time);
    my $logtimestamp = sprintf("%4d-%02d-%02d %02d:%02d:%02d",$logyear+1900,$logmon+1,$logmday,$loghour,$logmin,$logsec);
    $logmon++;
    my $logfile="$logdir$logmon-$logmday-logfile.log";
    my $fh;
    open($fh, '>>', "$logfile") or die "$logfile: $!";
    print $fh "$s\n";
    close($fh);
}

sub extract_date($) 
{
    my($in) = @_;
    my $gmyr = substr($in,0,4);
    my $gmmn = substr($in,5,2);
    my $gmdy = substr($in,8,2);
    my $gamedate = '\'' . $gmyr . '-' . $gmmn . '-' . $gmdy . '\'';
    return $gamedate;
}
 
sub extract_info($) 
{
    # This subroutine parses game information from the boxscore.xml file
    my ($box) = @_;
    my $home = $box->{boxscore}->[0]->{home_team_code};
    my $away = $box->{boxscore}->[0]->{away_team_code};
    my $home_id = $box->{boxscore}->[0]->{home_id};
    my $away_id = $box->{boxscore}->[0]->{away_id};
    my $gameid = "'" . $box->{boxscore}->[0]->{game_id} . "'";
    my $gamedate = extract_date($box->{boxscore}->[0]->{game_id});
    my $gameinfo = "'" . $box->{boxscore}->[0]->{game_info}->[0] . "'";
    my $away_team_runs = $box->{boxscore}->[0]->{linescore}->[0]->{away_team_runs};
    my $home_team_runs = $box->{boxscore}->[0]->{linescore}->[0]->{home_team_runs};
    return ($home, $away, $home_id, $away_id, $gameid, $gamedate, $gameinfo, $away_team_runs, $home_team_runs);
}
 
# Get the list of months from the base year directory
opendir MDIR, $basedir;
@monthdirs = readdir MDIR;
closedir MDIR;
                        
%homeBattingOrder;
%awayBattingOrder;

@sortedHomeBattingOrderArray;
@sortedAwayBattingOrderArray;

foreach $mondir (@monthdirs) 
{
    logit( "$mondir\n");

    if ($mondir =~ /month/) 
    {
        opendir DDIR, "$basedir/$mondir";
        my @daydirs = readdir DDIR;
        closedir DDIR;

        foreach $daydir (@daydirs) 
        {
            logit( "$daydir\n");

            if ($daydir =~ /day/) 
            {
                opendir GDIR, "$basedir/$mondir/$daydir";
                my @gamedirs = readdir GDIR;
                closedir GDIR;

                foreach $gamedir (@gamedirs) 
                {
                    logit( "$gamedir\n");

                    if ($gamedir =~ /gid_/ and (-e "$basedir/$mondir/$daydir/$gamedir/inning/inning_hit.xml")) 
                    {
                        print "$basedir/$mondir/$daydir/$gamedir\n";

                        $fulldir = "$basedir/$mondir/$daydir/$gamedir";

                        $box = $boxparser->XMLin("$fulldir/boxscore.xml");

                        my ($home, $away, $home_id, $away_id, $gameid, $gamedate, $gameinfo, $away_team_runs, $home_team_runs) = extract_info($box);
                        
                        # Game number = 1, unless the 2nd game of a doubleheader when game number = 2
                        $game_number = substr($gameid, -2, 1);

                        if ($gameinfo =~ /<br\/><b>Weather<\/b>: (\d+) degrees,.*<br\/><b>Wind<\/b>: (\d+) mph, ([\w\s]+).<br\/>/)
                        {
                            $temperature = $1;
                            $wind = $2;
                            $wind_dir = "'" . $3 . "'";
                        } 
                        else 
                        {
                            # Domed stadiums may list wind speed as "Indoors"
                            $gameinfo =~ /<br\/><b>Weather<\/b>: (\d+) degrees,.*<br\/><b>Wind<\/b>: Indoors.<br\/>/;
                            $temperature = $1;
                            $wind = 0;
                            $wind_dir = "'Indoors'";
                        }

                        $home = $dbh->quote($home);
                        $away = $dbh->quote($away);

                        #print "home: $home, home_team_runs: $home_team_runs, away:$away, away_team_runs:$away_team_runs.\n";

                        foreach $batter (@{$box->{boxscore}->[0]->{batting}->[0]->{batter}}) 
                        {
                            $id = $batter->{id};
                            $pos = $batter->{pos};
                            @pos_array = split(/-/, $pos);
                            $pos = $pos_array[0];    
                            $bo = $batter->{bo};
                             
                            if ($bo==(int($bo/100)*100) && ($bo/100)!=(0))
                            {
                                $homeBattingOrder{$id} = $bo/100;
                            }

                            if ($bo==(int($bo/100)*100) && !("P" eq $pos) && !("DH" eq $pos)) 
                            {
                                logit( "id: $id, pos: $pos, bo:$bo.\n");

                                switch($pos) 
                                {
                                    case "C"  {$hdef2 = $id;}
                                    case "1B" {$hdef3 = $id;}
                                    case "2B" {$hdef4 = $id;}
                                    case "3B" {$hdef5 = $id;}
                                    case "SS" {$hdef6 = $id;}
                                    case "LF" {$hdef7 = $id;}
                                    case "CF" {$hdef8 = $id;}
                                    case "RF" {$hdef9 = $id;}
                                    open (FIELDRECORD, ">> fielder_record.txt") || die "sorry, system can't open fieldrecord";
                                    logit( "WARNING: game $select_game_id - Found $id at non P/DH batting order $pos $bo without defensive position.\n");
                                    close FIELDRECORD;
                                }
                            }
                            else 
                            {
                                logit( "not a starter $bo.\n");
                            }
                        }

                        foreach $batter (@{$box->{boxscore}->[0]->{batting}->[1]->{batter}}) 
                        {
                            $id = $batter->{id};
                            $pos = $batter->{pos};
                            @pos_array = split(/-/, $pos);
                            $pos = $pos_array[0];    
                            $bo = $batter->{bo};
                             
                            if ($bo==(int($bo/100)*100) && ($bo/100)!=(0))
                            {
                                $awayBattingOrder{$id} = $bo/100;
                            }

                            if ($bo==(int($bo/100)*100) && !("P" eq $pos) && !("DH" eq $pos)) 
                            {
                                logit( "id: $id, pos: $pos, bo:$bo.\n");

                                switch($pos) 
                                {
                                    case "C"  {$adef2 = $id;}
                                    case "1B" {$adef3 = $id;}
                                    case "2B" {$adef4 = $id;}
                                    case "3B" {$adef5 = $id;}
                                    case "SS" {$adef6 = $id;}
                                    case "LF" {$adef7 = $id;}
                                    case "CF" {$adef8 = $id;}
                                    case "RF" {$adef9 = $id;}
                                    open (FIELDRECORD, ">> fielder_record.txt") || die "sorry, system can't open fieldrecord";
                                    logit( "WARNING: game $select_game_id - Found $id at non P/DH batting order $pos $bo without defensive position.\n");
                                    close FIELDRECORD;
                                }
                            }
                            else 
                            {
                                logit( "not a starter $bo.\n");
                            }
                        }

                        foreach $value (sort {$awayBattingOrder{$a} cmp $awayBattingOrder{$b} }
                                   keys %awayBattingOrder)
                        {
                             logit( "$value $awayBattingOrder{$value}\n");

                             push(@sortedAwayBattingOrderArray, $value);
                            
                        }

                        foreach $value (sort {$homeBattingOrder{$a} cmp $homeBattingOrder{$b} }
                                   keys %homeBattingOrder)
                        {
                             logit( "$value $homeBattingOrder{$value}\n");

                             push(@sortedHomeBattingOrderArray, $value);
                            
                        }

                        #print "@sortedAwayBattingOrderArray\n";
                        #print "@sortedHomeBattingOrderArray";

                        #while (($key, $value) = each(%awayBattingOrder)){
                        #     print "\n".$key.", ".$value."\n";
                        #}

                        #while (($key, $value) = each(%homeBattingOrder)){
                        #     print "\n".$key.", ".$value."\n";
                        #}

                        logit( "Home fielders: C $hdef2 bo: $homeBattingOrder{$hdef2}, 1B $hdef3 bo: $homeBattingOrder{$hdef3}, 2B $hdef4 bo: $homeBattingOrder{$hdef4}, 3B $hdef5 bo: $homeBattingOrder{$hdef5}, SS $hdef6 bo: $homeBattingOrder{$hdef6}, LF $hdef7 bo: $homeBattingOrder{$hdef7}, CF $hdef8 bo: $homeBattingOrder{$hdef8}, RF $hdef9 bo: $homeBattingOrder{$hdef9}.\n");
                        logit( "Away fielders: C $adef2 bo: $awayBattingOrder{$adef2}, 1B $adef3 bo: $awayBattingOrder{$adef3}, 2B $adef4 bo: $awayBattingOrder{$adef4}, 3B $adef5 bo: $awayBattingOrder{$adef5}, SS $adef6 bo: $awayBattingOrder{$adef6}, LF $adef7 bo: $awayBattingOrder{$adef7}, CF $adef8 bo: $awayBattingOrder{$adef8}, RF $adef9 bo: $awayBattingOrder{$adef9}.\n");

                        $game = $gameparser->XMLin("$fulldir/game.xml");
                        $game_time = $game->{game}->[0]->{local_game_time};
                        $game_time = $dbh->quote($game_time);

                        # Input the game info into the database
                        logit( "numRows $numRows\n");
                        $no_duplicate_query = 'SELECT id FROM games WHERE (date = ' . $gamedate
                                                . ' AND home_id = ' . $home_id . ' AND away_id = ' . $away_id . ' AND game_num = ' . $game_number . ')';

                        logit( "SQL check duplicate: $no_duplicate_query\n");
                        $sth= $dbh->prepare($no_duplicate_query) or die $DBI::errstr;
                        $sth->execute();
                        
                        my $numRows = $sth->rows;
                        logit( "numRows $numRows\n");
                        $sth->finish();
                        
                        if ($numRows) 
                        {
                            # don't insert duplicate game entry into games table
                        } 
                        else 
                        {
                            if ($temperature)
                            {
                                $game_query = 'INSERT INTO games (gid, date, home_id, away_id, game_num, wind, wind_dir, temp, 
                                                runs_home, runs_away, local_time, created_at) VALUES (' . $dbh->quote($gamedir) . ', ' . $gamedate . ', ' . $home_id . ', ' . $away_id 
                                                . ', ' . $game_number . ', ' . $wind . ', ' . $wind_dir . ', ' . $temperature . ', ' 
                                                . $home_team_runs . ', ' . $away_team_runs . ', ' . $game_time . ', NOW())';
                            }
                            else
                            {
                                $game_query = 'INSERT INTO games (gid, date, home_id, away_id, game_num, wind, wind_dir, 
                                                runs_home, runs_away, local_time, created_at) VALUES (' . $dbh->quote($gamedir) . ', ' . $gamedate . ', ' . $home_id . ', ' . $away_id 
                                                . ', ' . $game_number . ', ' . $wind . ', ' . $wind_dir . ', ' 
                                                . $home_team_runs . ', ' . $away_team_runs . ', ' . $game_time . ', NOW())';
                            }

                            logit( "SQL: $game_query\n");
                            $sth= $dbh->prepare($game_query) or die $DBI::errstr;
                            $sth->execute();
                            $sth->finish();
                        }

                        # Check for new players in the players.xml file and input them into the database    
                        $players = $playerparser->XMLin("$fulldir/players.xml");

                        foreach $team (@{$players->{game}->[0]->{team}}) 
                        {
                            $team_abbr = $dbh->quote($team->{id});
                            $team_name = $dbh->quote($team->{name});
                            #print "team_abbr: $team->{id}";
                            #print "team_name: $team->{name}";

                            foreach $player (@{$team->{player}}) 
                            {
                                $id = $dbh->quote($player->{id});
                                $first = $dbh->quote($player->{first});
                                $last = $dbh->quote($player->{last});
                                $number = $dbh->quote($player->{num});
                                $boxname = $dbh->quote($player->{boxname});
                                $position = $dbh->quote($player->{position});
                                $throws = $dbh->quote($player->{rl});

                                $no_duplicate_query = 'SELECT eliasid FROM players WHERE eliasid = ' . $id . ' AND team_abbr = ' . $team_abbr;
                                $sth= $dbh->prepare($no_duplicate_query) or die $DBI::errstr;
                                $sth->execute();

                                my $numRows = $sth->rows;
                                $sth->finish();
                                if ($numRows) 
                                {
                                    # don't insert duplicate player entry into players table
                                }
                                else 
                                {
                                    $player_query = 'INSERT INTO players (gameday_id, eliasid, first, last, number, boxname, position, throws, team_abbr, team_name, created_at) '
                                                    . 'VALUES (' . $dbh->quote($gamedir) . ', '. $id . ', '. $first . ', ' . $last . ', ' . $number . ', ' . $boxname . ', ' . $position . ', ' . $throws . ', ' . $team_abbr . ', ' . $team_name . ', NOW())';

                                    #print "SQL: $player_query\n";
                                    #WaitForKey();
                                    $sth= $dbh->prepare($player_query) or die $DBI::errstr;
                                    $sth->execute();
                                    $sth->finish();
                                }
                            }
                        }

                        # Check if game info has been input before inputting umpire, at bat, players, and pitch info
                        $game_id_query = 'SELECT id FROM games WHERE (date = ' . $gamedate
                                            . ' AND home_id = ' . $home_id . ' AND away_id = ' . $away_id . ' AND game_num = ' . $game_number . ')';
                        $sth= $dbh->prepare($game_id_query) or die $DBI::errstr;
                        $sth->execute();
                        
                        my $numRows = $sth->rows;
                        if (1==$numRows)
                        {
                            $select_game_id = $sth->fetchrow_array();
                            logit( "\nParsing game number $select_game_id ($gamedir).\n");
                        } 
                        else 
                        {
                            die "duplicate game entry $select_game_id in database or game not found.\n";
                        }

                        $sth->finish();

                        # Find the home plate umpire and input him into the database    
                        foreach $umpire (@{$players->{game}->[0]->{umpires}->[0]->{umpire}}) 
                        {
                            $umpire_name = $dbh->quote($umpire->{name});
                            $position = $umpire->{position};
                            
                            if ('home' eq $position) 
                            {
                                $no_duplicate_query = 'SELECT id FROM umpires WHERE name = ' . $umpire_name;
                                logit( "SQL: $no_duplicate_query\n");
                                $sth= $dbh->prepare($no_duplicate_query) or die $DBI::errstr;
                                $sth->execute();
                                my $numRows = $sth->rows;
                                
                                if ($numRows) 
                                {
                                    # don't insert duplicate umpire entry into umpires table
                                    # get umpire id
                                    $hp_ump_id = $dbh->quote($sth->fetchrow_array());
                                    $sth->finish();
                                } 
                                else 
                                {
                                    $sth->finish();
                                    $umpire_query = 'INSERT INTO umpires (name, created_at) '
                                                    . 'VALUES (' . $umpire_name . ', NOW())';

                                    logit( "SQL: $umpire_query\n");
                                    $sth= $dbh->prepare($umpire_query) or die $DBI::errstr;
                                    $sth->execute();
                                    $sth->finish();
                                    
                                    # get umpire id
                                    $umpire_id_query = 'SELECT id FROM umpires WHERE name = ' . $umpire_name;

                                    logit( "SQL: $umpire_id_query\n");
                                    $sth= $dbh->prepare($umpire_id_query) or die $DBI::errstr;
                                    $sth->execute();
                                    my $numRows = $sth->rows;
                                    
                                    if (1==$numRows) 
                                    {
                                        $hp_ump_id = $sth->fetchrow_array();
                                        $sth->finish();
                                    } 
                                    else 
                                    {
                                        die "numrows=$numRows, duplicate umpire entry $umpire_first $umpire_last in database or umpire not found.\n";
                                    }
                                }
                            } 
                            elsif ('first' eq $position) 
                            {
                                $no_duplicate_query = 'SELECT id FROM umpires WHERE name = ' . $umpire_name;
                                $sth= $dbh->prepare($no_duplicate_query) or die $DBI::errstr;
                                $sth->execute();
                                my $numRows = $sth->rows;

                                if ($numRows) 
                                {
                                    # don't insert duplicate umpire entry into umpires table
                                    # get umpire id
                                    $first_ump_id = $dbh->quote($sth->fetchrow_array());
                                    $sth->finish();
                                } 
                                else 
                                {
                                    $sth->finish();
                                    $umpire_query = 'INSERT INTO umpires (name, created_at) '
                                                    . 'VALUES (' . $umpire_name . ', NOW())';

                                    logit( "SQL: $umpire_query\n");
                                    $sth= $dbh->prepare($umpire_query) or die $DBI::errstr;
                                    $sth->execute();
                                    $sth->finish();

                                    # get umpire id
                                    $umpire_id_query = 'SELECT id FROM umpires WHERE name = ' . $umpire_name;
                                    $sth= $dbh->prepare($umpire_id_query) or die $DBI::errstr;
                                    $sth->execute();
                                    my $numRows = $sth->rows;
                                    
                                    if (1==$numRows) 
                                    {
                                        $first_ump_id = $sth->fetchrow_array();
                                        $sth->finish();
                                    } 
                                    else 
                                    {
                                        die "numrows=$numRows, duplicate umpire entry $umpire_first $umpire_last in database or umpire not found.\n";
                                    }
                                }
                            } 
                            elsif ('second' eq $position) 
                            {
                                $no_duplicate_query = 'SELECT id FROM umpires WHERE name = ' . $umpire_name;
                                $sth= $dbh->prepare($no_duplicate_query) or die $DBI::errstr;
                                $sth->execute();
                                my $numRows = $sth->rows;

                                if ($numRows) 
                                {
                                    # don't insert duplicate umpire entry into umpires table
                                    # get umpire id
                                    $second_ump_id = $dbh->quote($sth->fetchrow_array());
                                    $sth->finish();
                                } 
                                else 
                                {
                                    $sth->finish();
                                    $umpire_query = 'INSERT INTO umpires (name, created_at) '
                                                    . 'VALUES (' . $umpire_name . ', NOW())';

                                    logit( "SQL: $umpire_query\n");
                                    $sth= $dbh->prepare($umpire_query) or die $DBI::errstr;
                                    $sth->execute();
                                    $sth->finish();

                                    # get umpire id
                                    $umpire_id_query = 'SELECT id FROM umpires WHERE name = ' . $umpire_name;
                                    $sth= $dbh->prepare($umpire_id_query) or die $DBI::errstr;
                                    $sth->execute();
                                    my $numRows = $sth->rows;
                                    
                                    if (1==$numRows) 
                                    {
                                        $second_ump_id = $sth->fetchrow_array();
                                        $sth->finish();
                                    } 
                                    else 
                                    {
                                        die "numrows=$numRows, duplicate umpire entry $umpire_first $umpire_last in database or umpire not found.\n";
                                    }
                                }
                            } 
                            elsif ('third' eq $position) 
                            {
                                $no_duplicate_query = 'SELECT id FROM umpires WHERE name = ' . $umpire_name;
                                $sth= $dbh->prepare($no_duplicate_query) or die $DBI::errstr;
                                $sth->execute();
                                my $numRows = $sth->rows;

                                if ($numRows) 
                                {
                                    # don't insert duplicate umpire entry into umpires table
                                    # get umpire id
                                    $third_ump_id = $dbh->quote($sth->fetchrow_array());
                                    $sth->finish();
                                } 
                                else 
                                {
                                    $sth->finish();
                                    $umpire_query = 'INSERT INTO umpires (name, created_at) '
                                                    . 'VALUES (' . $umpire_name . ', NOW())';

                                    logit( "SQL: $umpire_query\n");
                                    $sth= $dbh->prepare($umpire_query) or die $DBI::errstr;
                                    $sth->execute();
                                    $sth->finish();

                                    # get umpire id
                                    $umpire_id_query = 'SELECT id FROM umpires WHERE name = ' . $umpire_name;
                                    $sth= $dbh->prepare($umpire_id_query) or die $DBI::errstr;
                                    $sth->execute();
                                    my $numRows = $sth->rows;

                                    if (1==$numRows) 
                                    {
                                        $third_ump_id = $sth->fetchrow_array();
                                        $sth->finish();
                                    } 
                                    else 
                                    {
                                        die "numrows=$numRows, duplicate umpire entry $umpire_first $umpire_last in database or umpire not found.\n";
                                    }
                                }
                            }
                        }

                        # update game record with umpire id
                        $umpire_update_query = 'UPDATE games SET umpire_hp_id = ' . $hp_ump_id. ', umpire_1b_id = ' . $first_ump_id. ', umpire_2b_id = ' . $second_ump_id. ', umpire_3b_id = ' . $third_ump_id. ' WHERE id = ' . $select_game_id;
                        logit( "SQL: $umpire_update_query\n");
                        $sth= $dbh->prepare($umpire_update_query) or die $DBI::errstr;
                        $sth->execute();
                        $sth->finish();

                        # Check for new teams in the game.xml file and input them into the database    
                        $teams = $teamparser->XMLin("$fulldir/game.xml");

                        foreach $team (@{$teams->{game}->[0]->{team}}) 
                        {
                            $id = $team ->{id};
                            $abbreviation = $team ->{abbrev};
                            $city = $dbh->quote($team ->{code});
                            $name = $dbh->quote($team ->{name_full});

                            $no_duplicate_query = 'SELECT id FROM teams WHERE id = ' . $id;
                            $sth= $dbh->prepare($no_duplicate_query) or die $DBI::errstr;
                            $sth->execute();
                            my $numRows = $sth->rows;
                            $sth->finish();

                            if ($numRows) 
                            {
                                # don't insert duplicate team entry into teams table
                            } 
                            else 
                            {
                                $player_query = 'INSERT INTO teams (id, abbreviation, city, name, created_at) '
                                                . 'VALUES (\'' . $id . '\', \''. $abbreviation . '\', '. $city . ', ' . $name . ', NOW())';

                                logit( "SQL: $player_query\n");
                                $sth= $dbh->prepare($player_query) or die $DBI::errstr;
                                $sth->execute();
                                $sth->finish();
                            }
                        }

                        # Parse the at bats and pitches from each inning_?.xml file
                        opendir IDIR, "$fulldir/inning";
                        my @inningfiles = readdir IDIR;
                        closedir IDIR;
                        my @innings = ();

                        foreach $inningfn (@inningfiles) 
                        {
                            if ($inningfn =~ /inning_(\d+)\.xml/) 
                            {
                                $inning_num = $1;

                                # Pre-process the inning_?.xml file
                                $inning = $inningparser->XMLin("$fulldir/inning/$inningfn");
                                @innings[$inning_num] = $inning;

                                foreach $action (@{$inning->{inning}->[0]->{top}->[0]->{action}})
                                {
                                    $act_event = $action->{event};
                                    $act_des = $action->{des};
                                    $act_player = $action->{player};

                                    $substitution_flag = 0;

                                    if ("Defensive Sub" eq $act_event) 
                                    {
                                        $substitution_flag = 1;
                                        if ($act_des =~ / playing ([\w\s]+)./)
                                        {
                                            $new_position = $1;
                                        } 
                                        elsif ($act_des =~ / as the ([\w\s]+)./)
                                        {
                                            $new_position = $1;
                                        } 
                                        else 
                                        {
                                            open (FIELDRECORD, ">> fielder_record.txt") || die "sorry, system can't open fieldrecord";
                                            logit( "WARNING: game $select_game_id - Could not identify new position for $act_player, inn $inning_num.\n");
                                            close FIELDRECORD;
                                        }

                                        logit( "Defensive player change at $new_position in inning $inning_num.\n");
                                    } 
                                    elsif ("Defensive Switch" eq $act_event) 
                                    {
                                        $substitution_flag = 1;

                                        if ($act_des =~ / as the ([\w\s]+)./) 
                                        {
                                            $new_position = $1;
                                        } 
                                        elsif ($act_des =~ / to ([\w\s]+) for /) 
                                        {
                                            $new_position = $1;
                                        } 
                                        else 
                                        {
                                            open (FIELDRECORD, ">> fielder_record.txt") || die "sorry, system can't open fieldrecord";
                                            logit( "WARNING: game $select_game_id - Could not identify new position for $act_player, inn $inning_num.\n");
                                            close FIELDRECORD;
                                        }

                                        logit( "Defensive player change at $new_position in inning $inning_num.\n");
                                    }

                                    if ($substitution_flag)
                                    {
                                        $new_position =~ s/ baseman/ base/;
                                        $new_position =~ s/ fielder/ field/;

                                        switch($new_position)
                                        {
                                            case "catcher"  {$hdef2 = $act_player;}
                                            case "first base"  {$hdef3 = $act_player;}
                                            case "second base"  {$hdef4 = $act_player;}
                                            case "third base"  {$hdef5 = $act_player;}
                                            case "shortstop"  {$hdef6 = $act_player;}
                                            case "left field"  {$hdef7 = $act_player;}
                                            case "center field"  {$hdef8 = $act_player;}
                                            case "right field"  {$hdef9 = $act_player;}
                                            case "designated hitter"  {}
                                            open (FIELDRECORD, ">> fielder_record.txt") || die "sorry, system can't open fieldrecord";
                                            logit( "WARNING: game $select_game_id - Found $act_player in a defensive substitution without defensive position ($new_position).\n");
                                            close FIELDRECORD;
                                        }

                                        logit( "Home fielders: C $hdef2, 1B $hdef3, 2B $hdef4, 3B $hdef5, SS $hdef6, LF $hdef7, CF $hdef8, RF $hdef9.\n");
                                    }
                                }

                                # Parse the at-bat and pitch data for the top and bottom halves of each inning
                                foreach $atbat (@{$inning->{inning}->[0]->{top}->[0]->{atbat}}) 
                                {
                                    $half = 1;
                                    parse_at_bats_and_pitches($atbat, $dbh, $select_game_id, $inning_num, $half, $hdef2, $hdef3, $hdef4, $hdef5, $hdef6, $hdef7, $hdef8, $hdef9);
                                }

                                foreach $action (@{$inning->{inning}->[0]->{bottom}->[0]->{action}}) 
                                {
                                    $act_event = $action->{event};
                                    $act_des = $action->{des};
                                    $act_player = $action->{player};

                                    $substitution_flag = 0;

                                    if ("Defensive Sub" eq $act_event) 
                                    {
                                        $substitution_flag = 1;

                                        if ($act_des =~ / playing ([\w\s]+)./) 
                                        {
                                            $new_position = $1;
                                        } 
                                        elsif ($act_des =~ / as the ([\w\s]+)./) 
                                        {
                                            $new_position = $1;
                                        } 
                                        else 
                                        {
                                            open (FIELDRECORD, ">> fielder_record.txt") || die "sorry, system can't open fieldrecord";
                                            logit( "WARNING: game $select_game_id - Could not identify new position for $act_player, inn $inning_num.\n");
                                            close FIELDRECORD;
                                        }

                                        logit( "Defensive player change at $new_position in inning $inning_num.\n");
                                    } 
                                    elsif ("Defensive Switch" eq $act_event) 
                                    {
                                        $substitution_flag = 1;

                                        if ($act_des =~ / as the ([\w\s]+)./) 
                                        {
                                            $new_position = $1;
                                        } 
                                        elsif ($act_des =~ / to ([\w\s]+) for /) 
                                        {
                                            $new_position = $1;
                                        } 
                                        else 
                                        {
                                            open (FIELDRECORD, ">> fielder_record.txt") || die "sorry, system can't open fieldrecord";
                                            logit( "WARNING: game $select_game_id - Could not identify new position for $act_player, inn $inning_num.\n");
                                            close FIELDRECORD;
                                        }

                                        logit( "Defensive player change at $new_position in inning $inning_num.\n");
                                    }

                                    if ($substitution_flag) 
                                    {
                                        $new_position =~ s/ baseman/ base/;
                                        $new_position =~ s/ fielder/ field/;

                                        switch($new_position) 
                                        {
                                            case "catcher"  {$adef2 = $act_player;}
                                            case "first base"  {$adef3 = $act_player;}
                                            case "second base"  {$adef4 = $act_player;}
                                            case "third base"  {$adef5 = $act_player;}
                                            case "shortstop"  {$adef6 = $act_player;}
                                            case "left field"  {$adef7 = $act_player;}
                                            case "center field"  {$adef8 = $act_player;}
                                            case "right field"  {$adef9 = $act_player;}
                                            case "designated hitter"  {}
                                            open (FIELDRECORD, ">> fielder_record.txt") || die "sorry, system can't open fieldrecord";
                                            logit( "WARNING: game $select_game_id - Found $act_player in a defensive substitution without defensive position ($new_position).\n");
                                            close FIELDRECORD;
                                        }

                                        logit( "Away fielders: C $adef2, 1B $adef3, 2B $adef4, 3B $adef5, SS $adef6, LF $adef7, CF $adef8, RF $adef9.\n");
                                    }
                                }

                                foreach $atbat (@{$inning->{inning}->[0]->{bottom}->[0]->{atbat}}) 
                                {
                                    $half = 2;
                                    parse_at_bats_and_pitches($atbat, $dbh, $select_game_id, $inning_num, $half, $adef2, $adef3, $adef4, $adef5, $adef6, $adef7, $adef8, $adef9);
                                }
                                
                                #print "select_game_id: $select_game_id";
                            }
                        }

                        update_at_bats_home_team_and_away_team_scores($select_game_id);
                        update_pitches_batter_on_deck_and_run_differential($select_game_id, $awayBattingOrder, $homeBattingOrder,$sortedAwayBattingOrderArray, $sortedHomeBattingOrderArray);                        

#                        foreach $inningfn (@inningfiles) 
#                        {
#                            if ($inningfn =~ /inning_(\d+)\.xml/) 
#                            {
#                                $inning_num = $1;
#
#                                # Pre-process the inning_?.xml file
#                                $inning = $inningparser->XMLin("$fulldir/inning/$inningfn");
#                                @innings[$inning_num] = $inning;
#
#                                foreach $action (@{$inning->{inning}->[0]->{top}->[0]->{action}})
#                                {
#                                    $act_event = $action->{event};
#                                    $act_des = $action->{des};
#                                    $act_player = $action->{player};
#
#                                    $substitution_flag = 0;
#
#                                    if ("Defensive Sub" eq $act_event) 
#                                    {
#                                        $substitution_flag = 1;
#                                        if ($act_des =~ / playing ([\w\s]+)./)
#                                        {
#                                            $new_position = $1;
#                                        } 
#                                        elsif ($act_des =~ / as the ([\w\s]+)./)
#                                        {
#                                            $new_position = $1;
#                                        } 
#                                        else 
#                                        {
#                                            open (FIELDRECORD, ">> fielder_record.txt") || die "sorry, system can't open fieldrecord";
#                                            logit( "WARNING: game $select_game_id - Could not identify new position for $act_player, inn $inning_num.\n");
#                                            close FIELDRECORD;
#                                        }
#
#                                        logit( "Defensive player change at $new_position in inning $inning_num.\n");
#                                    } 
#                                    elsif ("Defensive Switch" eq $act_event) 
#                                    {
#                                        $substitution_flag = 1;
#
#                                        if ($act_des =~ / as the ([\w\s]+)./) 
#                                        {
#                                            $new_position = $1;
#                                        } 
#                                        elsif ($act_des =~ / to ([\w\s]+) for /) 
#                                        {
#                                            $new_position = $1;
#                                        } 
#                                        else 
#                                        {
#                                            open (FIELDRECORD, ">> fielder_record.txt") || die "sorry, system can't open fieldrecord";
#                                            logit( "WARNING: game $select_game_id - Could not identify new position for $act_player, inn $inning_num.\n");
#                                            close FIELDRECORD;
#                                        }
#
#                                        logit( "Defensive player change at $new_position in inning $inning_num.\n");
#                                    }
#
#                                    if ($substitution_flag)
#                                    {
#                                        $new_position =~ s/ baseman/ base/;
#                                        $new_position =~ s/ fielder/ field/;
#
#                                        switch($new_position)
#                                        {
#                                            case "catcher"  {$hdef2 = $act_player;}
#                                           case "first base"  {$hdef3 = $act_player;}
#                                            case "second base"  {$hdef4 = $act_player;}
#                                            case "third base"  {$hdef5 = $act_player;}
#                                            case "shortstop"  {$hdef6 = $act_player;}
#                                            case "left field"  {$hdef7 = $act_player;}
#                                            case "center field"  {$hdef8 = $act_player;}
#                                            case "right field"  {$hdef9 = $act_player;}
#                                            case "designated hitter"  {}
#                                            open (FIELDRECORD, ">> fielder_record.txt") || die "sorry, system can't open fieldrecord";
#                                            logit( "WARNING: game $select_game_id - Found $act_player in a defensive substitution without defensive position ($new_position).\n");
#                                            close FIELDRECORD;
#                                        }
#
#                                        logit( "Home fielders: C $hdef2, 1B $hdef3, 2B $hdef4, 3B $hdef5, SS $hdef6, LF $hdef7, CF $hdef8, RF $hdef9.\n");
#                                    }
#                                }
#
#                                # Parse the at-bat and pitch data for the top and bottom halves of each inning
#                                foreach $atbat (@{$inning->{inning}->[0]->{top}->[0]->{atbat}}) 
#                                {
#                                    $half = 1;
#                                    create_or_update_prediction_keys_and_counters($atbat, $dbh, $select_game_id, $inning_num, $half, $hdef2);
#                                }
#
#                                foreach $action (@{$inning->{inning}->[0]->{bottom}->[0]->{action}}) 
#                                {
#                                    $act_event = $action->{event};
#                                    $act_des = $action->{des};
#                                    $act_player = $action->{player};
#
#                                    $substitution_flag = 0;
#
#                                    if ("Defensive Sub" eq $act_event) 
#                                    {
#                                        $substitution_flag = 1;
#
#                                        if ($act_des =~ / playing ([\w\s]+)./) 
#                                        {
#                                            $new_position = $1;
#                                        } 
#                                        elsif ($act_des =~ / as the ([\w\s]+)./) 
#                                        {
#                                            $new_position = $1;
#                                        } 
#                                        else 
#                                        {
#                                            open (FIELDRECORD, ">> fielder_record.txt") || die "sorry, system can't open fieldrecord";
#                                            logit( "WARNING: game $select_game_id - Could not identify new position for $act_player, inn $inning_num.\n");
#                                            close FIELDRECORD;
#                                        }
#
#                                        logit( "Defensive player change at $new_position in inning $inning_num.\n");
#                                    } 
#                                    elsif ("Defensive Switch" eq $act_event) 
#                                    {
#                                        $substitution_flag = 1;
#
#                                        if ($act_des =~ / as the ([\w\s]+)./) 
#                                        {
#                                            $new_position = $1;
#                                        } 
#                                        elsif ($act_des =~ / to ([\w\s]+) for /) 
#                                        {
#                                            $new_position = $1;
#                                        } 
#                                        else 
#                                        {
#                                            open (FIELDRECORD, ">> fielder_record.txt") || die "sorry, system can't open fieldrecord";
#                                            logit( "WARNING: game $select_game_id - Could not identify new position for $act_player, inn $inning_num.\n");
#                                            close FIELDRECORD;
#                                        }
#
#                                        logit( "Defensive player change at $new_position in inning $inning_num.\n");
#                                    }
#
#                                    if ($substitution_flag) 
#                                    {
#                                        $new_position =~ s/ baseman/ base/;
#                                        $new_position =~ s/ fielder/ field/;
#
#                                        switch($new_position) 
#                                        {
#                                            case "catcher"  {$adef2 = $act_player;}
#                                            case "first base"  {$adef3 = $act_player;}
#                                            case "second base"  {$adef4 = $act_player;}
#                                            case "third base"  {$adef5 = $act_player;}
#                                            case "shortstop"  {$adef6 = $act_player;}
#                                            case "left field"  {$adef7 = $act_player;}
#                                            case "center field"  {$adef8 = $act_player;}
#                                            case "right field"  {$adef9 = $act_player;}
#                                            case "designated hitter"  {}
#                                           open (FIELDRECORD, ">> fielder_record.txt") || die "sorry, system can't open fieldrecord";
#                                            logit( "WARNING: game $select_game_id - Found $act_player in a defensive substitution without defensive position ($new_position).\n");
#                                            close FIELDRECORD;
#                                        }
#
#                                        logit( "Away fielders: C $adef2, 1B $adef3, 2B $adef4, 3B $adef5, SS $adef6, LF $adef7, CF $adef8, RF $adef9.\n");
#                                    }
#                                }
#
#                                foreach $atbat (@{$inning->{inning}->[0]->{bottom}->[0]->{atbat}}) 
#                                {
#                                    $half = 2;
#                                    create_or_update_prediction_keys_and_counters($atbat, $dbh, $select_game_id, $inning_num, $half, $adef2);
#                                }
#                                
#                                #print "select_game_id: $select_game_id";
#                            }
#                        }
#
                        $hits = $hitsparser->XMLin("$fulldir/inning/inning_hit.xml");

                        # When a ball in play and an error are recorded on the same play, 
                        # the error may be the first play listed in inning_hit.xml or the second play.
                        # Currently the first play is recorded in the database, and 
                        # the second play is not recorded in the database but is saved to a text file
                        # for later manual review.  Some cases of batting around in one inning may
                        # also be saved to the text file.
                        # This section of code could be improved by automating the manual review process.
                        open (HITRECORD, ">> hit_record_2008.txt") || die "sorry, system can't open hitrecord";

                        foreach $hip (@{$hits->{hitchart}->[0]->{hip}}) 
                        {
                            logit( "$hip->{des}\n");
                            logit( "$hip->{x}\n");
                            logit( "$hip->{y}\n");
                            logit( "$dbh->quote($hip->{type})\n");
                            logit( "$hip->{batter}\n");
                            logit( "$hip->{pitcher}\n");
                            logit( "$hip->{inning}\n");
                        }

                        foreach $hip (@{$hits->{hitchart}->[0]->{hip}}) 
                        {
                            $hit_des = $hip->{des};
                            $hit_x = $hip->{x};
                            $hit_y = $hip->{y};
                            $hit_type = $dbh->quote($hip->{type});
                            $hit_batter = $hip->{batter};
                            $hit_pitcher = $hip->{pitcher};
                            $hit_inning = $hip->{inning};

                            # find the at bat that matches the ball in play
                            $find_ab_id_query = 'SELECT id, hit_x, event FROM atbats WHERE (game_id = ' . $select_game_id
                                                . ' AND inning = ' . $hit_inning . ' AND batter_id = ' . $hit_batter . ' AND pitcher_id = '
                                                . $hit_pitcher . ')';
                            logit( "SQL: $find_ab_id_query\n");
                            $sth= $dbh->prepare($find_ab_id_query) or die $DBI::errstr;
                            $sth->execute();
                            my $numRows = $sth->rows;

                            if (1==$numRows) 
                            {
                                # for one matching at bat, check if hit data already entered in database
                                ($select_ab_id, $select_hit_x, $select_event) = $sth->fetchrow_array();

                                # update atbats table with hit info for each matching at_bat
                                if (0<$select_hit_x) 
                                {
                                    # already entered into database
                                    logit( "game $select_game_id:1.1 This hit $hit_batter - $hit_pitcher - $hit_inning already recorded in database.\n");
                                } 
                                else 
                                {
                                    update_hit_info($hit_x, $hit_y, $hit_type, $select_ab_id, $select_game_id);
                                }
                            }
                            elsif (2==$numRows) 
                            {
                                # if the batter has batted twice in the inning against the same pitcher
                                ($select_ab_id, $select_hit_x, $select_event) = $sth->fetchrow_array();

                                # if the first ball in play is already recorded, don't update it
                                if ($hit_x==$select_hit_x && $select_event eq $hit_des) 
                                {
                                    logit( "game $select_game_id:2.1 This hit $hit_batter - $hit_pitcher - $hit_inning already recorded in database.\n");
                                } 
                                elsif (0<$select_hit_x) 
                                {
                                    # select the info for the second ball in play from the database
                                    ($select_ab_id, $select_hit_x, $select_event) = $sth->fetchrow_array();

                                    # if the second ball in play is already recorded, don't update it
                                    if ($hit_x==$select_hit_x && $select_event eq $hit_des) 
                                    {
                                        logit( "game $select_game_id:2.2 This hit $hit_batter - $hit_pitcher - $hit_inning already recorded in database.\n");
                                    } 
                                    else 
                                    {
                                        # if the second ball in play hasn't been recorded, update the db
                                        update_hit_info($hit_x, $hit_y, $hit_type, $select_ab_id, $select_game_id);
                                    }
                                } 
                                else 
                                {
                                    # if the first ball in play hasn't been recorded, update the db
                                    update_hit_info($hit_x, $hit_y, $hit_type, $select_ab_id, $select_game_id);
                                }
                            } 
                            else 
                            {
                                die "numrows=$numRows, no matching at bat found for hit $hit_batter - $hit_pitcher - $hit_inning.\n";
                            }
                        }
                        close HITRECORD;

                        # This is a debug section if you want to look at contents of the XML file
                        # in an easier-to-read format 
                        #use Data::Dumper;
                        #open (OUTFILE, "> debug_parser_innings_merge.txt") || die "sorry, system can't open outfile";
                        #print OUTFILE Dumper($hits); 
                        #print OUTFILE Dumper($players);
                        #print OUTFILE Dumper($names);
                        #print OUTFILE Dumper($box);
                        #print OUTFILE Dumper(@innings);
                        #close OUTFILE;
                    }

                    logit( "rename $basedir/$mondir/$daydir/$gamedir to ./games_ingested/year_$year/$mondir/$daydir/$gamedir \n");
                    logit( "mkdir $basedir/games_ingested/year_$year/$mondir/$daydir \n");
                    mkdir "/home1/pitchpre/public_html/PitchPredict/Util/GameDay/games_ingested", 0755;
                    mkdir "/home1/pitchpre/public_html/PitchPredict/Util/GameDay/games_ingested/year_$year", 0755;
                    mkdir "/home1/pitchpre/public_html/PitchPredict/Util/GameDay/games_ingested/year_$year/$mondir", 0755;
                    mkdir "/home1/pitchpre/public_html/PitchPredict/Util/GameDay/games_ingested/year_$year/$mondir/$daydir", 0755;
                    rename("$basedir/$mondir/$daydir/$gamedir","/home1/pitchpre/public_html/PitchPredict/Util/GameDay/games_ingested/year_$year/$mondir/$daydir/$gamedir");
                    
                    #WaitForKey();
                }
            }
        }
    }
}
 
sub WaitForKey() 
{
    print "\nPress any key to continue...";
    chomp($key = <STDIN>);
}
 
sub update_hit_info($hit_x, $hit_y, $hit_type, $select_ab_id, $select_game_id) 
{
    # update at bat record with hit info
    $hit_query = 'UPDATE atbats SET hit_x = ' . $hit_x . ', hit_y = ' . $hit_y . ', hit_type = ' . $hit_type . ' WHERE id = ' . $select_ab_id;
    $sth= $dbh->prepare($hit_query) or die $DBI::errstr;
    logit( "SQL: $hit_query\n");
    $sth->execute();
    $sth->finish();

    # update pitches record with hit info
    $pitches_query = 'UPDATE pitches SET hit_x = ' . $hit_x . ', hit_y = ' . $hit_y . ', hit_type = ' . $hit_type . ' WHERE id = ' . $select_ab_id . ' AND game_id = ' . $select_game_id . ' AND outcome = X';
    $sth= $dbh->prepare($pitches_query) or die $DBI::errstr;
    logit( "SQL: $pitches_query\n");
    $sth->execute();
    $sth->finish();
}

#sub update_predictions_table() 
#{
#    $all_pitches_query = 'SELECT id FROM pitches WHERE (game_id = ' . $select_game_id. ') ORDER BY atbat_id';
#    $sth= $dbh->prepare($all_pitches_query) or die $DBI::errstr;
#    $sth->execute();
#
#    while ( ($id) = $sth->fetchrow_array( ) ) 
#    {
#        #print "current batter at bat id: $id\n";
#
#        $atbats_query = 'SELECT home_team_runs, away_team_runs FROM atbats WHERE (game_id = ' . $select_game_id. ' AND num = ' . $id . ')';
#        $sth3= $dbh->prepare($atbats_query) or die $DBI::errstr;
#        #print "SQL: $atbats_query\n";
#        $sth3->execute();
#        my $numRows = $sth3->rows;
#
#        if ($numRows > 1) 
#        {
#            # don't insert duplicate at bat entry into atbats table
#           die "There should only ever be one at bat here\n"
#        } 
#        else
#        {
#            while ( ($home_team_runs, $away_team_runs) = $sth3->fetchrow_array( ) ) 
#            {
#                print "home_team_runs: $home_team_runs\n"; 
#                print "away_team_runs: $away_team_runs\n";
#            }
#            $sth3->finish();
#        }
#
#        $run_differential = abs($home_team_runs - $away_team_runs);
#
#        $no_duplicate_query = 'SELECT id FROM predictions WHERE (game_id = ' . $select_game_id
#                                . ' AND num = ' . $event_num . ')';
#        $sth4= $dbh->prepare($no_duplicate_query) or die $DBI::errstr;
#        $sth4->execute();
#        my $numRows = $sth4->rows;
#        $sth4->finish();
#
#        if ($numRows) 
#        {
#            # do some work to determine existing counters, success, failure, etc and add them to the new.
#            
#
#            # update record in the database for this situation
#            $predictions_query = 'UPDATE predictions SET batter_on_deck_id = ' . $batter_id . ', batter_on_deck_stand = ' . $dbh->quote($stand) . ' WHERE id = ' . $id;
#            $sth2= $dbh->prepare($predictions_query) or die $DBI::errstr;
#            #print "SQL: $predictions_query\n";
#            $sth2->execute();
#            $sth2->finish();
#        } 
#        else 
#        {
#            #do some work to determine counters, success, failure, etc.
#            
#
#            # insert a new record in the database for this situation
#            $predictions_query = 'INSERT INTO predictions (game_id, inning, num, ball, strike, outs,'
#                    . ' batter_id, pitcher_id, stand, des, event, half, def2, def3, def4, def5, def6, def7, def8, def9, home_team_runs, away_team_runs, created_at) '
#                    . 'VALUES (' . $select_game_id . ', ' . $inning_num . ', ' . $event_num 
#                    . ', ' . $ball . ', ' . $strike . ', ' . $out . ', ' . $batter_id 
#                    . ', ' . $pitcher_id . ', ' . $stand . ', ' . $des . ', ' . $event . ', ' . $half
#                    . ', ' . $def2 . ', ' . $def3 . ', ' . $def4 . ', ' . $def5 . ', ' . $def6
#                    . ', ' . $def7 . ', ' . $def8 . ', ' . $def9 . ', ' . $home_team_runs . ', ' . $away_team_runs . ', NOW())';
#
#            $sth4= $dbh->prepare($predictions_query) or die $DBI::errstr;
#            logit( "SQL: predictionsab_query\n");
#            $sth4->execute();
#            $sth4->finish();
#        }
#    }
#
#    $sth->finish();
#}

sub update_pitches_batter_on_deck_and_run_differential() 
{
    print "update_pitches_batter_on_deck_and_run_differential\n";

    my $select_game_id = shift;
    my $awayBattingOrder = shift;
    my $homeBattingOrder = shift;
    my $sortedAwayBattingOrderArray = shift;
    my $sortedHomeBattingOrderArray = shift;

    #while (($key, $value) = each(%awayBattingOrder)){
    #    print "\n".$key.", ".$value."\n";
    #}

    #while (($key, $value) = each(%homeBattingOrder)){
    #    print "\n".$key.", ".$value."\n";
    #}
    
    $all_pitches_query = 'SELECT id, batter_id, atbat_id FROM pitches WHERE (game_id = ' . $select_game_id. ') ORDER BY atbat_id';
    $sth= $dbh->prepare($all_pitches_query) or die $DBI::errstr;
    $sth->execute();

    while ( ($id, $batter_id, $atbat_id) = $sth->fetchrow_array( ) ) 
    {
        #print "current pitches id: $id\n";
        #print "current batter id: $batter_id\n";
        #print "current atbat id: $atbat_id\n";

        #$batter_on_deck_at_bat_id = $id + 1;
        #print "batter_on_deck_at_bat_id: $batter_on_deck_at_bat_id\n";

        #$atbats_query = 'SELECT batter_id, stand FROM atbats WHERE (game_id = ' . $select_game_id. ' AND num = ' . $atbat_id . ')';
        #$sth3= $dbh->prepare($atbats_query) or die $DBI::errstr;
        #print "SQL: $atbats_query\n";
        #$sth3->execute();

        # get the home team runs from the database to use when querying the pitch data
        $home_team_runs_query = 'SELECT home_team_runs FROM atbats WHERE (game_id = ' . $select_game_id
                        . ' AND num = ' . ($id - 1) . ')';
        #print "SQL: $home_team_runs_query\n";
        $sth5= $dbh->prepare($home_team_runs_query) or die $DBI::errstr;
        $sth5->execute();
        my $numRows = $sth5->rows;
        $home_team_runs = 0;
        if (1==$numRows) 
        {
            $home_team_runs = $sth5->fetchrow_array();
            #print " home_team_runs: $home_team_runs,";
            $sth5->finish();
        }  

        # get the away team runs from the database to use when querying the pitch data
        $away_team_runs_query = 'SELECT away_team_runs FROM atbats WHERE (game_id = ' . $select_game_id
                        . ' AND num = ' . ($id - 1) . ')';
        #print "SQL: $away_team_runs_query\n";
        $sth6= $dbh->prepare($away_team_runs_query) or die $DBI::errstr;
        $sth6->execute();
        my $numRows = $sth6->rows;
        #print " numRows: $numRows,";
        $away_team_runs = 0;
        if (1==$numRows) 
        {
            $away_team_runs = $sth6->fetchrow_array();
            #print " away_team_runs: $away_team_runs,";
            $sth6->finish();
        } 

        $run_differential = abs($home_team_runs - $away_team_runs);       
        #print "run_differential: $run_differential\n";
        
        #WaitForKey;

#        while ( ($batter_id, $stand) = $sth3->fetchrow_array( ) ) 
#        {
#            print "batter_id: $batter_id\n";        
#            print "stand: $stand\n";
#
#            # update record in the database for this pitch
#            if($batter_id)
#            {
#                $pitch_query = 'UPDATE pitches SET batter_on_deck_id = ' . $batter_id . ', batter_on_deck_stand = ' . $dbh->quote($stand) . ', run_differential = ' . $run_differential . ' WHERE id = ' . $id;
#            }
#            else
#            {
#                if($homeBattingOrder{$batter_id})
#                {
#                    print "Determine batting position home team\n";
#                    $battingPosition = $homeBattingOrder{$batter_id};
#
#                    $batter_on_deck_id_from_array = $sortedHomeBattingOrderArray[$batter_id + 1];
#                }
#                else
#                {
#                    print "Determine batting position away team\n";
#                    $battingPosition = $awayBattingOrder{$batter_id};
#
#                    $batter_on_deck_id_from_array = $sortedAwayBattingOrderArray[$batter_id + 1];
#                }
#
#                print "Batting position: $batter_on_deck_id_from_array\n";
#
#                $pitch_query = 'UPDATE pitches SET batter_on_deck_id = ' . $batter_on_deck_id_from_array . ', run_differential = ' . $run_differential . ' WHERE id = ' . $id;
#
#                print "SQL: $pitch_query\n";
#                WaitForKey();
#            }
#
#            $sth2= $dbh->prepare($pitch_query) or die $DBI::errstr;
#            #print "SQL: $pitch_query\n";
#            $sth2->execute();
#            $sth2->finish();
#            #$test_counter = $test_counter + 1;
#            #print "test_counter: $test_counter\n";
#            #WaitForKey();
#        }

        #($batter_id, $stand) = $sth3->fetchrow_array( );

        #print "current batter id: $batter_id\n";
        #print "home batter batting position: $homeBattingOrder{$batter_id}\n";
        #print "away batter batting position: $awayBattingOrder{$batter_id}\n";
        if($homeBattingOrder{$batter_id} > 0)
        {
            #print "Determine batting position home team $homeBattingOrder{$batter_id}\n";
            $battingPosition = $homeBattingOrder{$batter_id};
            #print "Batting position: $battingPosition\n";
            $batter_on_deck_id_from_array = $sortedHomeBattingOrderArray[$battingPosition + 1];
        }
        else
        {
            #print "Determine batting position away team $awayBattingOrder{$batter_id}\n";
            $battingPosition = $awayBattingOrder{$batter_id};
            #print "Batting position: $battingPosition\n";
            $batter_on_deck_id_from_array = $sortedAwayBattingOrderArray[$battingPosition + 1];
        }

        #print "Batting position: $batter_on_deck_id_from_array\n";

        if($batter_on_deck_id_from_array > 0)
        {
            $pitch_query = 'UPDATE pitches SET batter_on_deck_id = ' . $batter_on_deck_id_from_array . ', run_differential = ' . $run_differential . ' WHERE id = ' . $id;

            #print "SQL: $pitch_query\n";
            #WaitForKey();

            $sth2= $dbh->prepare($pitch_query) or die $DBI::errstr;
            #print "SQL: $pitch_query\n";
            $sth2->execute();
            $sth2->finish();
        }

        #$sth3->finish();
    }

    $sth->finish();
}

sub update_at_bats_home_team_and_away_team_scores() 
{
    $all_atbats_query = 'SELECT id, home_team_runs, away_team_runs, num FROM atbats WHERE (game_id = ' . $select_game_id. ') ORDER BY num';
    $sth= $dbh->prepare($all_atbats_query) or die $DBI::errstr;
    $sth->execute();

    $home_team_runs = 0;
    $away_team_runs = 0;

    #print "&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&\n";

    #print "home team runs: $home_team_runs\n";
    #print "away team runs: $away_team_runs\n\n";

    while ( ($id, $tmp_home_team_runs, $tmp_away_team_runs, $num) = $sth->fetchrow_array( ) ) 
    {
        #print "id: $id\n";
        #print "num: $num\n";
        #print "tmp_home team runs: $tmp_home_team_runs\n";
        #print "tmp_away team runs: $tmp_away_team_runs\n\n";

        if (($tmp_away_team_runs eq '') && ($tmp_home_team_runs eq ''))
        {
            #do nothing
        }
        else
        {
            $away_team_runs = $tmp_away_team_runs;
            $home_team_runs = $tmp_home_team_runs;

            #print "home team runs: $home_team_runs\n";
            #print "away team runs: $away_team_runs\n\n";
        }

        # update record in the database for this at bat
        $ab_query = 'UPDATE atbats SET home_team_runs = ' . $home_team_runs . ', away_team_runs = ' . $away_team_runs . ' WHERE id = ' . $id;
        $sth2= $dbh->prepare($ab_query) or die $DBI::errstr;
        #print "SQL: $ab_query\n";
        $sth2->execute();
        $sth2->finish();
    }

    $sth->finish();
}
 
sub parse_at_bats_and_pitches() 
{
    my $atbat = shift;
    my $dbh = shift;
    my $select_game_id = shift;
    my $inning_num = shift;
    my $half = shift;
    my $def2 = shift;
    my $def3 = shift;
    my $def4 = shift;
    my $def5 = shift;
    my $def6 = shift;
    my $def7 = shift;
    my $def8 = shift;
    my $def9 = shift;
    my @pitch_sequence_array = ();
    my @location_sequence_array = ();
    my $current_ball = 0;
    my $current_strike = 0;
    my $current_out = 0;
    logit( "$inning_num.\n");
 
    $event = $dbh->quote($atbat->{event});
    $event_num = $atbat->{num};
    $ball = $atbat->{b};
    $strike = $atbat->{s};
    $out = $atbat->{o};
    $pitcher_id = $atbat->{pitcher};
    $batter_id = $atbat->{batter};
    $stand = $dbh->quote($atbat->{stand});
    $des = $dbh->quote($atbat->{des});
    $home_team_runs = $dbh->quote($atbat->{home_team_runs});
    $away_team_runs = $dbh->quote($atbat->{away_team_runs});

    $no_duplicate_query = 'SELECT id FROM atbats WHERE (game_id = ' . $select_game_id
                            . ' AND num = ' . $event_num . ')';
    $sth= $dbh->prepare($no_duplicate_query) or die $DBI::errstr;
    $sth->execute();
    my $numRows = $sth->rows;
    $sth->finish();
    
    if ($numRows) 
    {
        # don't insert duplicate at bat entry into atbats table
        logit( "$select_game_id, $inning_num, $event_num: That's a duplicate at bat to one in the database already.\n");
    } 
    else 
    {
        # insert a new record in the database for this at bat
        $ab_query = 'INSERT INTO atbats (game_id, inning, num, ball, strike, outs,'
                    . ' batter_id, pitcher_id, stand, des, event, half, def2, def3, def4, def5, def6, def7, def8, def9, home_team_runs, away_team_runs, created_at) '
                    . 'VALUES (' . $select_game_id . ', ' . $inning_num . ', ' . $event_num 
                    . ', ' . $ball . ', ' . $strike . ', ' . $out . ', ' . $batter_id 
                    . ', ' . $pitcher_id . ', ' . $stand . ', ' . $des . ', ' . $event . ', ' . $half
                    . ', ' . $def2 . ', ' . $def3 . ', ' . $def4 . ', ' . $def5 . ', ' . $def6
                    . ', ' . $def7 . ', ' . $def8 . ', ' . $def9 . ', ' . $home_team_runs . ', ' . $away_team_runs . ', NOW())';

        $sth= $dbh->prepare($ab_query) or die $DBI::errstr;
        logit( "SQL: $ab_query\n");
        $sth->execute();
        $sth->finish();

        $no_duplicate_query = 'SELECT id FROM outcomes WHERE (outcome = ' . $event . ')';
        $sth= $dbh->prepare($no_duplicate_query) or die $DBI::errstr;
        $sth->execute();
        my $numRows = $sth->rows;
        $sth->finish();

        if ($numRows) 
        {
            # don't insert duplicate pitch type entry into pitche_types table
            logit( "$event: That's a duplicate outcome to one in the database already.\n");
        } 
        else 
        {
            # insert a new record in the database for this pitch type
            $outcome_query = 'INSERT INTO outcomes (outcome) '
                                . 'VALUES (' . $event . ')';
            logit( "SQL: $outcome_query\n");
            $sth= $dbh->prepare($outcome_query) or die $DBI::errstr;
            $sth->execute();
            $sth->finish();
        }
    }

    # get the at bat id from the database to use when inputting the pitch data
    $ab_id_query = 'SELECT id FROM atbats WHERE (game_id = ' . $select_game_id
                    . ' AND num = ' . $event_num . ')';
    $sth= $dbh->prepare($ab_id_query) or die $DBI::errstr;
    $sth->execute();
    my $numRows = $sth->rows;
    
    if (1==$numRows) 
    {
        $select_ab_id = $sth->fetchrow_array();
        logit( " ab#$select_ab_id,");
        $sth->finish();
    } 
    else 
    {
        die "numrows=$numRows, duplicate at bat entry $select_ab_id in database or game not found.\n";
    }
 
    foreach $pitch (@{$atbat->{pitch}}) 
    {
        # these fields are common to pitch-f/x and non-pfx data
        $pitch_des = $dbh->quote($pitch->{des});
        $pitch_id = $pitch->{id};
        $result_type = $dbh->quote($pitch->{type});
        $pitch_x = $pitch->{x};
        $pitch_y = $pitch->{y};
        $start_speed = $pitch->{start_speed};
        $on_1b = $dbh->quote($pitch->{on_1b});
        $on_2b = $dbh->quote($pitch->{on_2b});
        $on_3b = $dbh->quote($pitch->{on_3b});

        # determine if the data for this pitch includes pitch-f/x fields
        $pitchfx = 0;
        if (0 < $start_speed) 
        {
            $pitchfx = 1;
            $end_speed = $pitch->{end_speed};
            $sz_top = $pitch->{sz_top};
            $sz_bot = $pitch->{sz_bot};
            $pfx_x = $pitch->{pfx_x};
            $pfx_z = $pitch->{pfx_z};
            $px = $pitch->{px};
            $pz = $pitch->{pz};
            $x0 = $pitch->{x0};
            $y0 = $pitch->{y0};
            $z0 = $pitch->{z0};
            $vx0 = $pitch->{vx0};
            $vy0 = $pitch->{vy0};
            $vz0 = $pitch->{vz0};
            $ax = $pitch->{ax};
            $ay = $pitch->{ay};
            $az = $pitch->{az};
            $break_y = $pitch->{break_y};
            $break_angle = $pitch->{break_angle};
            $break_length = $pitch->{break_length};
            $sv_id = $dbh->quote($pitch->{sv_id});
            $pitch_type = $pitch->{pitch_type};
            $type_confidence = $pitch->{type_confidence};
            $zone = $pitch->{zone};
            $nasty = $pitch->{nasty};
            $cc = $dbh->quote($pitch->{cc});
            $spin_dir = $dbh->quote($pitch->{spin_dir});
            $spin_rate = $dbh->quote($pitch->{spin_rate});
        }

        $no_duplicate_query = 'SELECT id FROM pitches WHERE (atbat_id = ' . $select_ab_id
                                . ' AND pitch_id = ' . $pitch_id . ')';
        $sth= $dbh->prepare($no_duplicate_query) or die $DBI::errstr;
        $sth->execute();
        my $numRows = $sth->rows;
        $sth->finish();
        
        if ($numRows) 
        {
            # don't insert duplicate pitch entry into pitches table
            logit( "$select_ab_id, $pitch_id: That's a duplicate pitch to one in the database already.\n");
        } 
        else 
        {
            my $pitch_sequence_string = join(', ', @pitch_sequence_array);
            my $location_sequence_string = join(', ', @location_sequence_array);

            # insert a new record in the database for this pitch
            if ($pitchfx) 
            {

                if ($result_type eq "'X'")
                {
                    $pitch_query = 'INSERT INTO pitches (batter_id, pitcher_id, catcher_id, batter_stand, balls, strikes, outs, game_id, atbat_id, inning, half, description, outcome, des, event, pitch_id, pitch_sequence, location_sequence, x, y, start_speed,'
                                    . ' end_speed, sz_top, sz_bot, pfx_x, pfx_z, px, pz, x0, y0, z0, vx0, vy0,'
                                    . ' vz0, ax, ay, az, break_y, break_angle, break_length, sv_id, pitch_type,'
                                    . ' type_confidence, on_1b, on_2b, on_3b, zone, nasty, cc, spin_dir, spin_rate, created_at) '
                                    . 'VALUES (' . join(', ', ($batter_id, $pitcher_id, $def2, $stand, $current_ball, $current_strike, $current_out, $select_game_id, $select_ab_id, $pitch_des, $result_type, $des, $event, $pitch_id, $dbh->quote($pitch_sequence_string), $dbh->quote($location_sequence_string),  
                                    $pitch_x, $pitch_y, $start_speed, $end_speed, $sz_top, $sz_bot, $pfx_x, $pfx_z, 
                                    $px, $pz, $x0, $y0, $z0, $vx0, $vy0, $vz0, $ax, $ay, $az, $break_y, $break_angle, 
                                    $break_length, $sv_id, $dbh->quote($pitch_type), $type_confidence, $on_1b, $on_2b, $on_3b, $dbh->quote($zone), $dbh->quote($nasty), $cc, $spin_dir, $spin_rate, 'NOW()')) . ')';
                }
                else
                {
                    $pitch_query = 'INSERT INTO pitches (batter_id, pitcher_id, catcher_id, batter_stand, balls, strikes, outs, game_id, atbat_id, inning, half, description, outcome, pitch_id, pitch_sequence, location_sequence, x, y, start_speed,'
                                    . ' end_speed, sz_top, sz_bot, pfx_x, pfx_z, px, pz, x0, y0, z0, vx0, vy0,'
                                    . ' vz0, ax, ay, az, break_y, break_angle, break_length, sv_id, pitch_type,'
                                    . ' type_confidence, on_1b, on_2b, on_3b, zone, nasty, cc, spin_dir, spin_rate, created_at) '
                                    . 'VALUES (' . join(', ', ($batter_id, $pitcher_id, $def2, $stand, $current_ball, $current_strike, $current_out, $select_game_id, $select_ab_id, $inning_num, $half, $pitch_des, $result_type, $pitch_id, $dbh->quote($pitch_sequence_string), $dbh->quote($location_sequence_string),  
                                    $pitch_x, $pitch_y, $start_speed, $end_speed, $sz_top, $sz_bot, $pfx_x, $pfx_z, 
                                    $px, $pz, $x0, $y0, $z0, $vx0, $vy0, $vz0, $ax, $ay, $az, $break_y, $break_angle, 
                                    $break_length, $sv_id, $dbh->quote($pitch_type), $type_confidence, $on_1b, $on_2b, $on_3b, $dbh->quote($zone), $dbh->quote($nasty), $cc, $spin_dir, $spin_rate, 'NOW()')) . ')';
                }
            } 
            else 
            {
                $pitch_query = 'INSERT INTO pitches (game_id, atbat_id, description, outcome, pitch_id, x, y, on_1b, on_2b, on_3b)'
                                . ' VALUES (' . join(', ', ($select_game_id, $select_ab_id, $pitch_des, $result_type, $pitch_id,
                                $pitch_x, $pitch_y, $on_1b, $on_2b, $on_3b)) . ')';
            }

            logit( "SQL: $pitch_query\n");
            $sth= $dbh->prepare($pitch_query) or die $DBI::errstr;
            $sth->execute();
            $sth->finish();

            #if ($result_type eq "'X'")
            #{
                # update at bat record with pitch type and zone info
                #$atbat_query = 'UPDATE atbats SET on_1b = ' . $on_1b . ', on_2b = ' . $on_2b . ', on_3b = ' . $on_3b . ', zone = ' . $dbh->quote($zone) . ', pitch_type = ' . $dbh->quote($pitch_type) . ' WHERE id = ' . $select_ab_id;
                #$sth= $dbh->prepare($atbat_query) or die $DBI::errstr;
                #logit( "SQL: $atbat_query\n");
                #$sth->execute();
                #$sth->finish();
            #}

            #record pitch/location sequences after pitch
            push(@pitch_sequence_array, $pitch_type);
            logit( "pitch_sequence_string: $pitch_sequence_string.\n");

            push(@location_sequence_array, $zone);
            logit( "location_sequence_string: $location_sequence_string.\n");

            #update balls, strikes, outs after pitch
            logit( "result_type: $result_type.\n");
            if ($result_type eq "'B'")
            {
                $current_ball += 1;
            }

            if ($result_type eq "'S'") 
            {
                $current_strike += 1;
            }

            if ($current_strike > 2)    
            {
                $current_strike = 2;
            }

            $current_out = $out - 1;

            if ($current_out < 0)
            {
                $current_out = 0;
            }
        }

        $no_duplicate_query = 'SELECT id FROM pitch_types WHERE (abbreviation = ' . $dbh->quote($pitch_type) . ')';
        $sth= $dbh->prepare($no_duplicate_query) or die $DBI::errstr;
        $sth->execute();
        my $numRows = $sth->rows;
        $sth->finish();

        if ($numRows) 
        {
            # don't insert duplicate pitch type entry into pitche_types table
            logit( "$pitch_type: That's a duplicate pitch type to one in the database already.\n");
        } 
        else 
        {
            # insert a new record in the database for this pitch type
            $pitch_type_query = 'INSERT INTO pitch_types (abbreviation, created_at) '
                                . 'VALUES (' . $dbh->quote($pitch_type) . ', NOW())';
            logit( "SQL: $pitch_type_query\n");
            $sth= $dbh->prepare($pitch_type_query) or die $DBI::errstr;
            $sth->execute();
            $sth->finish();
        }

        $no_duplicate_query = 'SELECT id FROM zones WHERE (zone = ' . $dbh->quote($zone) . ')';
        $sth= $dbh->prepare($no_duplicate_query) or die $DBI::errstr;
        $sth->execute();
        my $numRows = $sth->rows;
        $sth->finish();

        if ($numRows) 
        {
            # don't insert duplicate pitch type entry into pitche_types table
            logit( "$zone: That's a duplicate zone to one in the database already.\n");
        } 
        else 
        {
            # insert a new record in the database for this pitch type
            $zone_query = 'INSERT INTO zones (zone) '
                                . 'VALUES (' . $dbh->quote($zone) . ')';
            logit( "SQL: $zone_query\n");
            $sth= $dbh->prepare($zone_query) or die $DBI::errstr;
            $sth->execute();
            $sth->finish();
        }
    }
}
 
sub create_or_update_prediction_keys_and_counters() 
{
    print "create_or_update_prediction_keys_and_counters\n";
    
    my $atbat = shift;
    my $dbh = shift;
    my $select_game_id = shift;
    my $inning_num = shift;
    my $half = shift;
    my $def2 = shift;
    my @pitch_sequence_array = ();
    my @location_sequence_array = ();
    my $current_ball = 0;
    my $current_strike = 0;
    my $current_out = 0;
    logit( "$inning_num.\n");
 
    $event = $dbh->quote($atbat->{event});
    $event_num = $atbat->{num};
    $ball = $atbat->{b};
    $strike = $atbat->{s};
    $out = $atbat->{o};
    $pitcher_id = $atbat->{pitcher};
    $batter_id = $atbat->{batter};
    $stand = $dbh->quote($atbat->{stand});
    $des = $dbh->quote($atbat->{des});

    # get the at bat id from the database to use when querying the pitch data
    $ab_id_query = 'SELECT id FROM atbats WHERE (game_id = ' . $select_game_id
                    . ' AND num = ' . $event_num . ')';
    $sth= $dbh->prepare($ab_id_query) or die $DBI::errstr;
    $sth->execute();
    my $numRows = $sth->rows;
    
    if (1==$numRows) 
    {
        $select_ab_id = $sth->fetchrow_array();
        logit( " ab#$select_ab_id,");
        $sth->finish();
    } 
    else 
    {
        die "numrows=$numRows, duplicate at bat entry $select_ab_id in database or game not found.\n";
    }

    # get the on deck batter id from the database to use when querying the pitch data
    $batter_id_query = 'SELECT batter_id FROM atbats WHERE (game_id = ' . $select_game_id
                    . ' AND num = ' . ($event_num + 1) . ')';
    $sth= $dbh->prepare($batter_id_query) or die $DBI::errstr;
    $sth->execute();
    my $numRows = $sth->rows;
    
    if (1==$numRows) 
    {
        $select_batter_id = $sth->fetchrow_array();
        logit( " ab#$select_ab_id,");
        $sth->finish();
    } 
    else 
    {
        print "last bat of the game....how do I get the on deck hitter info?\n";
    }

    # get the home team runs from the database to use when querying the pitch data
    $home_team_runs_query = 'SELECT home_team_runs FROM atbats WHERE (game_id = ' . $select_game_id
                    . ' AND num = ' . ($event_num - 1). ')';
    $sth= $dbh->prepare($home_team_runs_query) or die $DBI::errstr;
    $sth->execute();
    my $numRows = $sth->rows;
    $home_team_runs = 0;
    if (1==$numRows) 
    {
        $home_team_runs = $sth->fetchrow_array();
        logit( " home_team_runs: $home_team_runs,");
        $sth->finish();
    } 

    # get the away team runs from the database to use when querying the pitch data
    $away_team_runs_query = 'SELECT away_team_runs FROM atbats WHERE (game_id = ' . $select_game_id
                    . ' AND num = ' . ($event_num - 1) . ')';
    $sth= $dbh->prepare($away_team_runs_query) or die $DBI::errstr;
    $sth->execute();
    my $numRows = $sth->rows;
    $away_team_runs = 0;
    if (1==$numRows) 
    {
        $away_team_runs = $sth->fetchrow_array();
        logit( " away_team_runs: $away_team_runs,");
        $sth->finish();
    } 

    $run_differential = abs($home_team_runs - $away_team_runs);
 
    foreach $pitch (@{$atbat->{pitch}}) 
    {
        # these fields are common to pitch-f/x and non-pfx data
        $pitch_des = $dbh->quote($pitch->{des});
        $pitch_id = $pitch->{id};
        $result_type = $dbh->quote($pitch->{type});
        $pitch_x = $pitch->{x};
        $pitch_y = $pitch->{y};
        $start_speed = $pitch->{start_speed};
        $on_1b = $dbh->quote($pitch->{on_1b});
        $on_2b = $dbh->quote($pitch->{on_2b});
        $on_3b = $dbh->quote($pitch->{on_3b});

        # determine if the data for this pitch includes pitch-f/x fields
        $pitchfx = 0;
        if (0 < $start_speed) 
        {
            $pitchfx = 1;
            $end_speed = $pitch->{end_speed};
            $sz_top = $pitch->{sz_top};
            $sz_bot = $pitch->{sz_bot};
            $pfx_x = $pitch->{pfx_x};
            $pfx_z = $pitch->{pfx_z};
            $px = $pitch->{px};
            $pz = $pitch->{pz};
            $x0 = $pitch->{x0};
            $y0 = $pitch->{y0};
            $z0 = $pitch->{z0};
            $vx0 = $pitch->{vx0};
            $vy0 = $pitch->{vy0};
            $vz0 = $pitch->{vz0};
            $ax = $pitch->{ax};
            $ay = $pitch->{ay};
            $az = $pitch->{az};
            $break_y = $pitch->{break_y};
            $break_angle = $pitch->{break_angle};
            $break_length = $pitch->{break_length};
            $sv_id = $dbh->quote($pitch->{sv_id});
            $pitch_type = $pitch->{pitch_type};
            $type_confidence = $pitch->{type_confidence};
            $zone = $pitch->{zone};
            $nasty = $pitch->{nasty};
            $cc = $dbh->quote($pitch->{cc});
            $spin_dir = $dbh->quote($pitch->{spin_dir});
            $spin_rate = $dbh->quote($pitch->{spin_rate});
        }

        my $pitch_sequence_string = join(', ', @pitch_sequence_array);
        my $location_sequence_string = join(', ', @location_sequence_array);

        $no_duplicate_prediction_key_exact_p_c_b_od_br_anyab_query = 'SELECT id, exact_p_c_b_od_br_ab_predictions_id FROM pitches WHERE (pitcher_id = ' . $pitcher_id
                                                                    . ' AND catcher_id = ' . $def2 
                                                                    . ' AND batter_id = ' . $batter_id 
                                                                    . ' AND batter_on_deck_id = ' . $select_batter_id 
                                                                    . ' AND on_1b = ' . $on_1b
                                                                    . ' AND on_2b = ' . $on_2b 
                                                                    . ' AND on_3b = ' . $on_3b
                                                                    . ' AND run_differential = ' . $run_differential 
                                                                    . ' AND pitch_sequence = ' . $dbh->quote($pitch_sequence_string) 
                                                                    . ' AND location_sequence = ' . $dbh->quote($location_sequence_string) 
                                                                    . ' AND balls = ' . $current_ball 
                                                                    . ' AND strikes = ' . $current_strike 
                                                                    . ' AND outs = ' . $current_out . ')';
        print "prediction key query: $no_duplicate_prediction_key_exact_p_c_b_od_br_anyab_query";
        WaitForKey();
        $sth= $dbh->prepare($no_duplicate_prediction_key_exact_p_c_b_od_br_anyab_query) or die $DBI::errstr;
        $sth->execute();

        #create new key
        $exact_p_c_b_od_br_ab_predictions_id = &createKey;

        #print "exact_p_c_b_od_br_ab_predictions_id: $exact_p_c_b_od_br_ab_predictions_id\n";
        
        #check for existing key, if exists update key
        while ( ($id, $tmp_exact_p_c_b_od_br_ab_predictions_id) = $sth->fetchrow_array( ) ) 
        {
            print "tmp_exact_p_c_b_od_br_ab_predictions_id: $tmp_exact_p_c_b_od_br_ab_predictions_id\n";

            if (($tmp_exact_p_c_b_od_br_ab_predictions_id = 0))
            {
                #do nothing
            }
            else
            {
                $exact_p_c_b_od_br_ab_predictions_id = $tmp_exact_p_c_b_od_br_ab_predictions_id;
                logit( " exact_p_c_b_od_br_ab_predictions_id: $exact_p_c_b_od_br_ab_predictions_id,");
            }
        }
        $sth->finish();

        #print "exact_p_c_b_od_br_ab_predictions_id: $exact_p_c_b_od_br_ab_predictions_id\n";

        $sth= $dbh->prepare($no_duplicate_prediction_key_exact_p_c_b_od_br_anyab_query) or die $DBI::errstr;
        $sth->execute();
        
        #update with proper key
        while ( ($id, $tmp_exact_p_c_b_od_br_ab_predictions_id) = $sth->fetchrow_array( ) ) 
        {
            $pitch_query = 'UPDATE pitches SET exact_p_c_b_od_br_ab_predictions_id = ' . $exact_p_c_b_od_br_ab_predictions_id . ' WHERE id = ' . $id;
            print "pitch_query: $pitch_query";
            logit( "SQL: $pitch_query\n");
            $sth2= $dbh->prepare($pitch_query) or die $DBI::errstr;
            $sth2->execute();
        }
        $sth2->finish();
        $sth->finish();

        #record pitch/location sequences after pitch
        push(@pitch_sequence_array, $pitch_type);
        logit( "pitch_sequence_string: $pitch_sequence_string.\n");

        push(@location_sequence_array, $zone);
        logit( "location_sequence_string: $location_sequence_string.\n");

        #update balls, strikes, outs after pitch
        logit( "result_type: $result_type.\n");
        if ($result_type eq "'B'")
        {
            $current_ball += 1;
        }

        if ($result_type eq "'S'") 
        {
            $current_strike += 1;
        }

        if ($current_strike > 2)    
        {
            $current_strike = 2;
        }

        $current_out = $out - 1;

        if ($current_out < 0)
        {
            $current_out = 0;
        }
    }
}

sub createKey
{
    $sessionId  ="";

    for($i=0 ; $i< 16 ;)
    {
            $j = chr(int(rand(127)));

            if($j =~ /[a-zA-Z0-9]/)
            {
                    $sessionId .=$j;
                    $i++;
            }
    }
    
    return $sessionId;
}