<?php
function generateUniqueKey()
{
  return md5(microtime().rand());
}

function generateRandomColor()
{
    $v = 0;
    $array = array();

    for ($i=0;$i<6;$i++)
    {
        //loops 6 times to create 5 numbers
        $tot = rand(0, 15);

        if (($tot>9) && ($tot<16))
        { 
            //assigns 10 to "a" in hex
            if ($tot == 10)
            {
                $tot = $other0;
                $other0 = "a";
                //echo $other0;
                $array[$v++] = $other0;
            }
            elseif ($tot == 11)
            { //assigns 11 to "b" in hex
                $tot = $other1;
                $other1 = "b";
                //echo $other1;
                $array[$v++] = $other1;
            }
            elseif ($tot == 12)
            { //assigns 12 to "b" in hex
                $tot = $other2;
                $other2 = "c";
                //echo $other2;
                $array[$v++] = $other2;
            }
            elseif ($tot == 13)
            { //assigns 13 to "b" in hex
                $tot = $other3;
                $other3 = "d";
                //echo $other3;
                $array[$v++] = $other3;
            }
            elseif ($tot == 14)
            { //assigns 14 to "b" in hex
                $tot = $other4;
                $other4 = "e";
                //echo $other4;
                $array[$v++] = $other4;
            }
            elseif ($tot == 15) 
            { //assigns 15 to "b" in hex
                $tot = $other5;
                $other5 = "f";
                //echo $other5;
                $array[$v++] = $other5;
            }
        }
        else 
        {
            //echo $tot;
            $array[$v++] = $tot; //if not, then just assign to array
        }
    }
      
    $var = "";
    $color = "";

    for ($t=0; $t<6;$t++)
    {
      $var .= (string) $array[$t]; //displays the 6 numbers as one string
    }
    //var_dump($var); //for more visual reference, uncomment the var_dump
//    $color = "#" . $var;

    return $var;
}
?>
