<?php
/*
 * COPYRIGHT    2009 AsTech Development
 *
 *
 * DESRIPTION:  This file is the html <div id="menu"> for the index page in the
 *              Pitch Predict web site.
 *
 * SOFTWARE HISTORY:
 *
 *   15FEB09    S. Aslan
 *              Initial Coding.
 */

  function verifyString($str)
  {
	if ($str != "" && $str != null)
	{
//		echo "STRING: $str<br>";
		return eregi('^[a-zA-Z0-9\ \,]+$', $str);
	}
	else
	{
		return true;
	}
  }

  function verifyNumber($num)
  {
      if($num != "undefined")
      {
	if ($num != "" && $num != null && $num <=9)
	{
//		echo "num: $num<br>";
		return eregi('^[0-9]$', $num);
	}
	if ($num != "" && $num != null && $num > 9)
	{
		return eregi('^[0-9]+[0-9]$', $num);
	}
	else
	{
		return true;
	}
      }
    else
    {
            return true;
    }
  }

/*
  function verifyPassword($str)
  {
	if ($str != "" && $str != null)
	{
		//echo "STRING: $str<br>";
		return eregi('^[a-zA-Z0-9]{6,50}$', $str);
	}
	else
	{
		return false;
	}
  }

  function verifyEmail($eaddr)
  {
    return eregi('^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,5}$', $eaddr);
  }

  function verifyText($text)
  {
    return eregi('^[[:print:]]+$', $text);
  }
  */
?>