if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    async function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const fullDate = `${new Date().getDate()}-${
        new Date().getMonth() + 1
      }-${new Date().getFullYear()}`;

      try {
        const resp = await axios.get(
          `http://api.aladhan.com/v1/timings/${fullDate}?latitude=${latitude}&longitude=${longitude}&method=2`
        );

        const prayerTimes = resp.data.data.timings;
        console.log("Prayer Times:", prayerTimes);
        
        const timings = document.querySelectorAll('.time')

            timings.forEach((time)=>{  
                console.log(time);
                const prayers = time.querySelector('#pry-time-placeholder');
                if(prayerTimes[time.id]){
                //    prayers.textContent = prayerTimes[time.id];
                   prayers.textContent = prayerTimes[time.id];
            }
            })
            
            // timings.forEach((time) => {
            //   const prayers = time.querySelector("#pry-time-placeholder");
            //   if (prayerTimes[time.id]) {
            //     prayers.textContent = prayerTimes[time.id];
            //   }
            // });

            

      } catch (error) {
        console.error("Error getting prayer times:", error);
      }
    },
    function (error) {
      console.error("Error getting location:", error);
    }
  );
} else {
  console.error("Geolocation is not supported by your browser.");
}


       