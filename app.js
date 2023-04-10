const locations = [
  {
    country: "UAE",
    city: "Dubai",
    name: "Twiggy by La Cantine",
    phone: "+971 4 602 1105",
    mapUrl:
      "https://maps.google.com/maps?q=TwiggybyLaCantine-DubaiCreekClubSt-PortSaeed-Dubai-UnitedArabEmirates&t=&z=18&ie=UTF8&iwloc=&output=embed",
  },
  {
    country: "UAE",
    city: "Dubai",
    name: "Mad Kicks (Box Park)",
    phone: "+971 4 547 5663",
    mapUrl:
      "https://maps.google.com/maps?q=MadKicks-M2-02,BoxPark-AlWaslRd-Dubai-UnitedArabEmirates&t=&z=18&ie=UTF8&iwloc=&output=embed",
  },
  {
    country: "UAE",
    city: "Dubai",
    name: "Mad Kicks (Bluewaters)",
    phone: "+971 4 354 3345",
    mapUrl:
      "https://maps.google.com/maps?q=MadKicksBluewatersIsland-BluewatersIsland-Dubai-United Arab Emirates&t=&z=18&ie=UTF8&iwloc=&output=embed",
  },
  {
    country: "Saudi Arabia",
    city: "Riyadh",
    name: "Papillon",
    phone: "+966 11 225 1783",
    mapUrl:
      "https://maps.google.com/maps?q=Papillon,شارعالاميرتركيبنعبدالعزيزالثاني،Hittin,Riyadh13513,SaudiArabia&t=&z=18&ie=UTF8&iwloc=&output=embed",
  },
  {
    country: "Spain",
    city: "Marbella",
    name: "FC&Co",
    phone: "+34 952 86 39 96",
    mapUrl:
      "https://maps.google.com/maps?q=FC&Co,N-340,s/n,Local81,29603Marbella,Málaga,Spain&t=&z=18&ie=UTF8&iwloc=&output=embed",
  },
  {
    country: "Spain",
    city: "Fuengirola",
    name: "FC&Co",
    phone: "+34 952 47 25 20",
    mapUrl:
      "https://maps.google.com/maps?q=FC&Co,CCMiramar,Av.delEncarnación,s/n,A-43,29640Fuengirola,Málaga,Spain&t=&z=18&ie=UTF8&iwloc=&output=embed",
  },
  {
    country: "Morocco",
    city: "Tetuan",
    name: "Divina - Fashion Store",
    phone: "+212 5399-94654",
    mapUrl:
      "https://maps.google.com/maps?q=Divina-FashionStore,Rés.AlWouroud,Av.desFAR,Tétouan93000,Morocco&t=&z=18&ie=UTF8&iwloc=&output=embed",
  },
  {
    country: "Morocco",
    city: "Tetuan",
    name: "Mr Watch (Marjane Tetouan)",
    phone: "+212 689-485340",
    mapUrl:
      "https://maps.google.com/maps?q=MarjaneTetouan,Marjan،Tetouan93000,Morocco&t=&z=18&ie=UTF8&iwloc=&output=embed",
  },
];

const map = document.getElementById("map");
const searchBox = document.getElementById("search-box");
const locationsDiv = document.getElementById("locations");

// Show all locations
let locationsHtml = "";
locations.forEach((location) => {
  locationsHtml += `<p data-mapurl="${location.mapUrl}">${location.name}<br>${location.phone}</p>`;
});
locationsDiv.innerHTML = locationsHtml;

// Add event listeners to the locations
document.querySelectorAll("#locations p").forEach((location) => {
  location.addEventListener("click", () => {
    const mapUrl = location.getAttribute("data-mapurl");
    updateMap({ mapUrl });
  });
});

// Update the map iframe src when a location is selected
const updateMap = ({ mapUrl }) => {
  map.src = mapUrl;
};

const searchLocations = () => {
  const searchTerm = searchBox.value.toLowerCase();
  const filteredLocations = locations.filter(
    (location) =>
      location.city.toLowerCase().includes(searchTerm) ||
      location.country.toLowerCase().includes(searchTerm) ||
      location.name.toLowerCase().includes(searchTerm)
  );
  let locationsHtml = "";
  filteredLocations.forEach((location) => {
    locationsHtml += `<p data-mapurl="${location.mapUrl}" style="opacity: 1; pointer-events: auto">${location.name}<br>${location.phone}</p>`;
  });
  locationsDiv.innerHTML = locationsHtml;

  // Show all locations below filtered results with low opacity and not clickable
  let remainingLocationsHtml = "";
  locations.forEach((location) => {
    if (!filteredLocations.includes(location)) {
      remainingLocationsHtml += `<p style="opacity: 0.5; pointer-events: none">${location.name}<br>${location.phone}</p>`;
    }
  });
  locationsDiv.innerHTML += remainingLocationsHtml;

  // Add event listeners to the filtered locations
  document.querySelectorAll("#locations p").forEach((location) => {
    location.addEventListener("click", () => {
      const mapUrl = location.getAttribute("data-mapurl");
      updateMap({ mapUrl });
    });
  });
};

// Add event listeners to the search box
searchBox.addEventListener("input", searchLocations);
searchBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchLocations();
  }
});
