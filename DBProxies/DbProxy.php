<?php
class DbProxy {
    public $theDatabaseConnection;
    
    //mysql 
    public function __construct($databaseName)
    {
        $databaseHost = 'localhost';
        $databaseUserName = 'pitchpre_pbp';
        $databasePassword = 'Sheffield11';

	$this->theDatabaseConnection = mysql_pconnect("$databaseHost", "$databaseUserName", "$databasePassword");
        if (!$this->theDatabaseConnection) 
        {
            echo "<p>Could not connect to the server '" . $databaseHost . "'</p>\n";
            echo "databaseHost: ".$databaseHost;
            echo "databaseUserName: ".$databaseUserName;
            echo "databasePassword: ".$databasePassword;
            echo "databaseName: ".$databaseName;
            echo mysql_error();
        }
        else
        {
//            echo "<p>Successfully connected to the server '" . $databaseHost . "'</p>\n";
//            printf("MySQL client info: %s\n", mysql_get_client_info());
//            printf("MySQL host info: %s\n", mysql_get_host_info());
//            printf("MySQL server version: %s\n", mysql_get_server_info());
//            printf("MySQL protocol version: %s\n", mysql_get_proto_info());
        }
	if ($this->theDatabaseConnection && !$databaseName)
        {
		echo "<p>No database name was given. Available databases:</p>\n";
		$db_list = mysql_list_dbs($this->theDatabaseConnection);
		echo "<pre>\n";
		while ($row = mysql_fetch_array($db_list)) {
     		echo $row['Database'] . "\n";
		}
		echo "</pre>\n";
	}
	if ($databaseName) 
        {
            $dbcheck = mysql_select_db("$databaseName");
            if (!$dbcheck) 
            {
                echo mysql_error();
            }
            else
            {
//                echo "<p>Successfully connected to the database '" . $databaseName . "'</p>\n";
//                // Check tables
//                $sql = "SHOW TABLES FROM `$databaseName`";
//                $result = mysql_query($sql);
//                if (mysql_num_rows($result) > 0) {
//                        echo "<p>Available tables:</p>\n";
//                        echo "<pre>\n";
//                        while ($row = mysql_fetch_row($result)) {
//                                echo "{$row[0]}\n";
//                        }
//                        echo "</pre>\n";
//                } else {
//                        echo "<p>The database '" . $databaseName . "' contains no tables.</p>\n";
//                        echo mysql_error();
//                }
            }
	}
    }
    
    public function __destruct()
    {
        $this->dbProxyClose();
    }
    
    public function dbProxyClose()
    { 
//        mysql_close($this->theDatabaseConnection);          
    } 
    
    public function dbProxyNumResults($result)
    {    
        return mysql_num_rows($result);
    }   
    
    public function dbProxyQuery($query)
    { 
//        echo 'SQL query: '.$query;
        return mysql_query($query, $this->theDatabaseConnection);
    }     
    
    public function dbProxyFetchAssocArray($result)
    {    
        return mysql_fetch_array($result, MYSQL_ASSOC);
    }     
    
    public function dbProxyResetResultSet($result)
    {    
        mysql_data_seek($result, 0);
    }  
    
    
    
    //mysqli 
//    public function __construct($databaseName)
//    {
////        echo 'connect to: '.$databaseName;
//        $databaseHost = 'p:localhost';
//        $databaseUserName = 'pitchpre_pbp';
//        $databasePassword = 'Sheffield11';
//        
//        $this->theDatabaseConnection = new mysqli($databaseHost, $databaseUserName, $databasePassword, $databaseName);
//
//        if($this->theDatabaseConnection->connect_errno > 0)
//        {
//            die('Unable to connect to database [' . $this->theDatabaseConnection->connect_error . ']');
//        }
//    }
//    
//    public function __destruct()
//    {
//        $this->dbProxyClose();
//    }
//    
//    public function dbProxyClose()
//    { 
//        //$this->theDatabaseConnection->close();          
//    } 
//    
//    public function dbProxyNumResults($result)
//    {    
//        return $result->num_rows;
//    }   
//    
//    public function dbProxyQuery($query)
//    {    
////        echo 'SQL query: '.$query;
//        return $this->theDatabaseConnection->query($query);
//    }     
//    
//    public function dbProxyFetchAssocArray($result)
//    {    
//        return $result->fetch_assoc();
//    }   
//    
//    public function dbProxyResetResultSet($result)
//    {    
//        $result->data_seek(0);
//    }  
}

?>
