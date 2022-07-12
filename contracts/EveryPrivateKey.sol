//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./Secp256k1.sol";


contract EveryPrivateKey is ERC721, Ownable, Secp256k1 {
	using Strings for uint256;

	constructor()
		ERC721('Every Private Key', 'PRIVATEKEY')
		Ownable()
	{}

	/**
	 * Ownership functions
	 **/
	function airdrop(
		address _addr
	)
		external
		onlyOwner
	{
		/*
		_mint(
			address,
			tokenIds[idx],
			amounts[idx],
			""
		);
		*/
	}

	/**
	 * Public functions
	 **/

	// Source & Credit: https://ethereum.stackexchange.com/a/47502
	function toHexDigit(uint8 d) pure internal returns (bytes1) {
		if (0 <= d && d <= 9) {
			return bytes1(uint8(bytes1('0')) + d);
		} else if (10 <= uint8(d) && uint8(d) <= 15) {
			return bytes1(uint8(bytes1('a')) + d - 10);
		}
		revert("Invalid hex digit");
	}

	// Source & Credit: https://ethereum.stackexchange.com/a/47502
	function toHexString(uint a) public pure returns (string memory) {
		uint count = 0;
		uint b = a;
		while (b != 0) {
			count++;
			b /= 16;
		}

		bytes memory res = new bytes(count);
		for (uint i=0; i<count; ++i) {
			b = a % 16;
			res[count - i - 1] = toHexDigit(uint8(b));
			a /= 16;
		}

		return string(res);
	}

	function toPublicKey(uint _tokenId) public pure returns (bytes memory) {
		(uint x, uint y) = derivePubKey(_tokenId);

		return abi.encodePacked(
			//uint8(4),
			x,
			y
		);
	}

	function toPublicAddress(uint _tokenId) public pure returns (address) {
		return address(bytes20(keccak256(toPublicKey(_tokenId)) << (256-160)));
	}

	function tokenURI(
		uint256 _tokenId
	)
		public
		view
		virtual
		override
	returns (
		string memory
	) {
		// Get the public address from the private key
		string memory privateKey = string(abi.encodePacked('0x', toHexString(_tokenId)));
		address publicAddress = address(toPublicAddress(_tokenId));

		return string(
			abi.encodePacked(
				abi.encodePacked(
					bytes('data:application/json;utf8,{"name":"'),
					privateKey,
					bytes('","description":"This is a Private Key: '),
					privateKey
				),
				abi.encodePacked(
					bytes(' for address '),
					publicAddress,
					bytes('","image":"'),
					publicAddress,
					bytes('","animation_url":"'),
					publicAddress,
					bytes('"}')
				)
			)
		);
	}


	/**
	 * @dev do not accept value sent directly to contract
	 */
	receive()
		external
		payable
	{
		revert();
	}
}
