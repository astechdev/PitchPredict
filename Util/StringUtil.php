<?php
/*
 * COPYRIGHT    2009 AsTech Development
 *
 *
 * DESRIPTION:  This file is the ...
 *
 * SOFTWARE HISTORY:
 *
 *   17FEB09    S. Aslan
 *              Initial Coding.
 */

function str_startswith($source, $prefix)
{
   return strncmp($source, $prefix, strlen($prefix)) == 0;
}

function startsWith($source, $prefix) 
{
    if (str_startswith($source, $prefix))
    {
       return true;
    }
    else
    {
       return false;
    }
}

?>