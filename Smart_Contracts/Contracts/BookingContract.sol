// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract BookingContract {

    address public owner;

    struct Booking {
        address user;
        string details;
        uint256 timestamp;
    }
    function createBooking(string memory _details) public {
        bookings.push(
            Booking({
                user: msg.sender,
                details: _details,
                timestamp: block.timestamp
            })
        );
    }
    function getTotalBookings() public view returns (uint256) {
        return bookings.length;
    }

    function getBooking(uint256 index) public view returns (
        address,
        string memory,
        uint256
    ) {
        Booking memory b = bookings[index];
        return (b.user, b.details, b.timestamp);
    }
}
