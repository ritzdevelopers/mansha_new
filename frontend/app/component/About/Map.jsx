import React from "react";

const Map = () => {
  return (
    <section className="w-full bg-white pb-[0px] lg:pb-[0px]">
      <div className="mx-auto max-w-[1525px] ">
        <div className="overflow-hidden border border-[#DDDDDD]">
          <iframe
            title="Mansha Group Corporate Office Map"
            src="https://maps.google.com/maps?q=Mansha%20Group%20-%20Real%20Estate%20Developers%20in%20Faridabad%2C%20P%2C%2023%2C%20Sector%2075%2C%20Faridabad%2C%20Haryana%20121002&t=m&z=10&output=embed&iwloc=near&hl=en_US"
            width="100%"
            height="450"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-[300px] w-full md:h-[380px] lg:h-[500px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Map;