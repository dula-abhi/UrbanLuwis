const fabrics = [
    { name: "Cotton", colors: ["White", "Blue", "Green"], designs: ["Plain", "Striped"] },
    { name: "Silk", colors: ["Red", "Gold", "Black"], designs: ["Floral", "Abstract"] },
    { name: "Linen", colors: ["Beige", "Brown"], designs: ["Plain", "Checked"] },
    { name: "Denim", colors: ["Blue", "Dark Blue"], designs: ["Washed", "Ripped"] },
    { name: "Wool", colors: ["Grey", "Black", "Navy"], designs: ["Herringbone", "Tweed"] },
    { name: "Polyester", colors: ["White", "Yellow"], designs: ["Solid", "Printed"] },
    { name: "Rayon", colors: ["Teal", "Orange"], designs: ["Geometric", "Paisley"] },
    { name: "Velvet", colors: ["Maroon", "Purple"], designs: ["Solid", "Embossed"] },
    { name: "Chiffon", colors: ["Pink", "Light Blue"], designs: ["Floral", "Dot"] },
    { name: "Georgette", colors: ["Peach", "Mint"], designs: ["Abstract", "Plain"] }
  ];
  
  const cardContainer = document.getElementById("cardContainer");
  const modal = document.getElementById("detailsModal");
  const fabricName = document.getElementById("fabricName");
  const fabricDetails = document.getElementById("fabricDetails");
  
  fabrics.forEach((fabric, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerText = fabric.name;
    card.onclick = () => showDetails(index);
    cardContainer.appendChild(card);
  });
  
  function showDetails(index) {
    const fabric = fabrics[index];
    fabricName.innerText = fabric.name;
    fabricDetails.innerHTML = `
      <strong>Colors:</strong> ${fabric.colors.join(", ")}<br/>
      <strong>Designs:</strong> ${fabric.designs.join(", ")}
    `;
    modal.style.display = "flex";
  }
  
  function closeModal() {
    modal.style.display = "none";
  }
  