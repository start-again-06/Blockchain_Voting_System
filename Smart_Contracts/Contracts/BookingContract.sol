// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BookingContract {
    address public owner;
    uint256 public bookingFee = 0.01 ether;

    struct Booking {
        address user;
        string details;
        uint256 timestamp;
    }

    Booking[] public bookings;

    constructor() {
        owner = msg.sender;
    }

    function createBooking(string memory _details) public payable {
        require(msg.value == bookingFee, "Incorrect ETH amount");

        bookings.push(
            Booking(msg.sender, _details, block.timestamp)
        );
    }

    function withdraw() public {
        require(msg.sender == owner, "Not owner");
        payable(owner).transfer(address(this).balance);
    }
}
