const { expect } = require("chai");

describe("BookingContract", function () {
  let booking, owner, user;

  beforeEach(async () => {
    [owner, user] = await ethers.getSigners();
    const Booking = await ethers.getContractFactory("BookingContract");
    booking = await Booking.deploy();
  });

  it("should accept booking with ETH", async () => {
    await booking.connect(user).createBooking(
      "Test booking",
      { value: ethers.parseEther("0.01") }
    );

    expect(await booking.getTotalBookings()).to.equal(1);
  });

  it("should fail without ETH", async () => {
    await expect(
      booking.connect(user).createBooking("Fail")
    ).to.be.reverted;
  });
});
