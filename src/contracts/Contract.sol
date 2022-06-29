// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

/**
 * @title TestContract
 * @author Rafał Kalinowski
 * @notice This contract is used just as a mock
 */
contract TestContract {
    function add(uint256 a, uint256 b) external pure returns (uint256) {
        return a + b;
    }
}