// Copyright 2019-2022 Parity Technologies (UK) Ltd.
// This file is part of Substrate.

// Substrate is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Substrate is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Substrate.  If not, see <http://www.gnu.org/licenses/>.

//! Some helper functions to work with 128bit numbers. Note that the functionality provided here is
//! only sensible to use with 128bit numbers because for smaller sizes, you can always rely on
//! assumptions of a bigger type (u128) being available, or simply create a per-thing and use the
//! multiplication implementation provided there.

use crate::biguint;
use num_traits::Zero;
use sp_std::{cmp::{min, max}, convert::TryInto, mem};

/// Helper gcd function used in Rational128 implementation.
pub fn gcd(a: u128, b: u128) -> u128 {
	match ((a, b), (a & 1, b & 1)) {
		((x, y), _) if x == y => y,
		((0, x), _) | ((x, 0), _) => x,
		((x, y), (0, 1)) | ((y, x), (1, 0)) => gcd(x >> 1, y),
		((x, y), (0, 0)) => gcd(x >> 1, y >> 1) << 1,
		((x, y), (1, 1)) => {
			let (x, y) = (min(x, y), max(x, y));
			gcd((y - x) >> 1, x)
		},
		_ => unreachable!(),
	}
}

/// split a u128 into two u64 limbs
pub fn split(a: u128) -> (u64, u64) {
	let al = a as u64;
	let ah = (a >> 64) as u64;
	(ah, al)
}

/// Convert a u128 to a u32 based biguint.
pub fn to_big_uint(x: u128) -> biguint::BigUint {
	let (xh, xl) = split(x);
	let (xhh, xhl) = biguint::split(xh);
	let (xlh, xll) = biguint::split(xl);
	let mut n = biguint::BigUint::from_limbs(&[xhh, xhl, xlh, xll]);
	n.lstrip();
	n
}

/// Safely and accurately compute `a * b / c`. The approach is:
///   - Simply try `a * b / c`.
///   - Else, convert them both into big numbers and re-try. `Err` is returned if the result
///     cannot be safely casted back to u128.
///
/// Invariant: c must be greater than or equal to 1.
pub fn multiply_by_rational(mut a: u128, mut b: u128, mut c: u128) -> Result<u128, &'static str> {
	if a.is_zero() || b.is_zero() { return Ok(Zero::zero()); }
	c = c.max(1);

	// a and b are interchangeable by definition in this function. It always helps to assume the
	// bigger of which is being multiplied by a `0 < b/c < 1`. Hence, a should be the bigger and
	// b the smaller one.
	if b > a {
		mem::swap(&mut a, &mut b);
	}

	// Attempt to perform the division first
	if a % c == 0 {
		a /= c;
		c = 1;
	} else if b % c == 0 {
		b /= c;
		c = 1;
	}

	if let Some(x) = a.checked_mul(b) {
		// This is the safest way to go. Try it.
		Ok(x / c)
	} else {
		let a_num = to_big_uint(a);
		let b_num = to_big_uint(b);
		let c_num = to_big_uint(c);

		let mut ab = a_num * b_num;
		ab.lstrip();
		let mut q = if c_num.len() == 1 {
			// PROOF: if `c_num.len() == 1` then `c` fits in one limb.
			ab.div_unit(c as biguint::Single)
		} else {
			// PROOF: both `ab` and `c` cannot have leading zero limbs; if length of `c` is 1,
			// the previous branch would handle. Also, if ab for sure has a bigger size than
			// c, because `a.checked_mul(b)` has failed, hence ab must be at least one limb
			// bigger than c. In this case, returning zero is defensive-only and div should
			// always return Some.
			let (mut q, r) = ab.div(&c_num, true).unwrap_or((Zero::zero(), Zero::zero()));
			let r: u128 = r.try_into()
				.expect("reminder of div by c is always less than c; qed");
			if r > (c / 2) { q = q.add(&to_big_uint(1)); }
			q
		};
		q.lstrip();
		q.try_into().map_err(|_| "result cannot fit in u128")
	}
}
