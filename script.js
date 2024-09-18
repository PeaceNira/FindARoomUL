const buildingAcronyms = {
    "Schuman Building": { acronyms: ["S"], link: "https://maps.app.goo.gl/dwgzdSP9WXfgHuQm8" },
    "Kemmy Business School": { acronyms: ["KB"], link: "https://maps.app.goo.gl/owHGAn8NJqELBYuw8" },
    "Computer Science Building": { acronyms: ["CS"], link: "https://maps.app.goo.gl/5PwH5nKDr2H5HQ9F6" },
    "Glucksman Library": { acronyms: ["GL"], link: "https://maps.app.goo.gl/BXtFYB6Bi9JMfim58" },
    "Foundation Building": { acronyms: ["F"], link: "https://maps.app.goo.gl/CMGNow2w8JKCLs1w7" },
    "Engineering Research Building": { acronyms: ["ER"], link: "https://maps.app.goo.gl/g22HtvqEsr3fwKZv6" },
    "Languages Building": { acronyms: ["LC"], link: "https://maps.app.goo.gl/tw9yQL3bqEVmVeTX7" },
    "Lonsdale Building": { acronyms: ["L"], link: "https://maps.app.goo.gl/wMyurRMW8e1FmSy47" },
    "Schrodinger Building": { acronyms: ["SR"], link: "https://maps.app.goo.gl/ez6eqtVKUss1yoWp9" },
    "PESS Building": { acronyms: ["P"], link: "https://maps.app.goo.gl/XAakN9zxL6HfZQk1A" },
    "Health Sciences Building": { acronyms: ["HS"], link: "https://maps.app.goo.gl/jLw5HmNYi3JUNpvi6" },
    "Main Building BLOCK A": { acronyms: ["A"], link: "https://maps.app.goo.gl/gVw4CikGzaymFqz26" },
    "Main Building BLOCK B": { acronyms: ["B"], link: "https://maps.app.goo.gl/gVw4CikGzaymFqz26" },
    "Main Building BLOCK C": { acronyms: ["C"], link: "https://maps.app.goo.gl/gVw4CikGzaymFqz26" },
    "Main Building BLOCK D": { acronyms: ["D"], link: "https://maps.app.goo.gl/gVw4CikGzaymFqz26" },
    "Main Building BLOCK E": { acronyms: ["E"], link: "https://maps.app.goo.gl/gVw4CikGzaymFqz26" },
    "Analog Building": { acronyms: ["AD"], link: "https://maps.app.goo.gl/xN34mcRj32H2ndsy5" },
    "Irish World Academy": { acronyms: ["IW"], link: "https://maps.app.goo.gl/KEfpwx7rcWiAP3JaA" }
};


function findRoom(location) {
    location = location.trim().toUpperCase();

    let buildingName = null;
    let roomNumber = null;
    let mapsLink = null;

    for (const [building, { acronyms, link }] of Object.entries(buildingAcronyms)) {
        for (const acronym of acronyms) {
            if (location.startsWith(acronym)) {
                roomNumber = location.slice(acronym.length).trim();
                buildingName = building;
                mapsLink = link;
                break;
            }
        }
        if (buildingName) break;
    }

    if (!buildingName) {
        return `Unknown building acronym. Please check the input: ${location}.`;
    }

    if (!roomNumber || (!/^\d/.test(roomNumber) && !"GMO".includes(roomNumber[0]))) {
        return `Invalid room number for the location: ${location}.`;
    }

    const floorNumber = getFloorNumber(roomNumber);

    return {
        building: buildingName,
        floor: floorNumber,
        room: `Room ${roomNumber.substring(1)}`,
        googleLink: mapsLink
    };
}


function getFloorNumber(roomNumber) {
    const firstChar = roomNumber[0];
    if (["G", "M", "O"].includes(firstChar)) {
        return "Ground floor";
    }
    return `Floor ${firstChar}`;
}


function handleFindRoom() {
    const roomInput = document.getElementById("roomInput").value;
    const roomDetails = findRoom(roomInput);

    if (typeof roomDetails === 'object') {
        document.getElementById("building").textContent = `Building: ${roomDetails.building}`;
        document.getElementById("floor").textContent = `Floor: ${roomDetails.floor}`;
        document.getElementById("room").textContent = roomDetails.room;
        document.getElementById("link").innerHTML = `<a href="${roomDetails.googleLink}" target="_blank">Google Maps</a>`;
    } else {
        document.getElementById("building").textContent = roomDetails;
        document.getElementById("floor").textContent = "";
        document.getElementById("room").textContent = "";
        document.getElementById("link").textContent = "";
    }
}
