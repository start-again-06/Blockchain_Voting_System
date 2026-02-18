// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract VotingContract {
    address public owner;

    struct Candidate {
        string name;
        uint256 voteCount;
    }
    Candidate[] private candidates;
    mapping(address => bool) public hasVoted;
  
