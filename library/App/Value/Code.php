<?php
/*
 * Created by Palo Verde Programming Services, LLC.
 * All rights reserved unless otherwise specified under contract.
 * http://palo-verde.us/
 * @author Sam McCallum <sam@palo-verde.us>
 * @copyright Mar 24, 2010
 */

/**
 * Description of OptoutCode
 *
 * @author Sam McCallum <sam@palo-verde.us>
 */
class App_Value_Code {

	/**
	 * Create an alpha numeric code
	 * @param int $length
	 * @return string
	 */
	public function get($length = 6) {
		$parts = "abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
		$number_of_parts = strlen($parts);
		$code = array();
		for ($i=0; $i<$length;$i++) {
			$position = rand(0, $number_of_parts-1);
			$digit = $parts{$position};
			$code[$i] = $digit;
		}
		return implode("", $code);
	}
}