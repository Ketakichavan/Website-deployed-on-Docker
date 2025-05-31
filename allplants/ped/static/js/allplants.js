function savePlant(plantFile) {
 
    if (!savedPlants.includes(plantFile)) {
      savedPlants.push(plantFile);
      localStorage.setItem("savedPlants", JSON.stringify(savedPlants));
      alert("Added ✅");
    } else {
      alert("Already Saved!");
    }
  }