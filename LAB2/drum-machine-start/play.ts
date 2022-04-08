const historyList = document.querySelector(".history") as HTMLElement;
const lastSoundName = document.querySelector("#last-sound-name") as HTMLElement;
// IMPORTANT: Do NOT add any more global variables. 

// TODO: Step 1a - Implement the function playSound.
// Make the audio element with the matching data-sound attribute play.
// Also, update the lastSoundName to display the name of the sound.
function playSound(sound : string): void {
  let soundElm : HTMLAudioElement = document.querySelector(`audio[data-sound="${sound}"]`) as HTMLAudioElement
    soundElm.currentTime = 0; //restarts the sound
    soundElm.play();  
    lastSoundName.textContent = sound;
}

// TODO: Step 2a - Set up a listener for the "keydown" event. 
// Based on the key pressed, add the "playing" class 
// to the .drum element with matching data-key attribute.
// Then play the appropriate sound, based on its data-sound attribute.
// Ignore repeated key presses from held-down keys.
document.addEventListener("keydown", (event: KeyboardEvent) => {
  
  if (event.repeat)
      return;
  if (event.key === "/"){
    historyList.classList.toggle("hidden");
  }
  if (event.key === "?")
    document.querySelectorAll<HTMLElement>("li").forEach(function(element : HTMLElement){
      element.remove();
    });
  let elm = document.querySelector(`.drum[data-key='${event.key}']`) as HTMLElement | null
  if (!elm) {
      return;
  }
  elm.classList.add("playing");
  playSound(elm.dataset.sound as string)
  addToHistory(elm)
  
});

// TODO: Step 2b - Set up a listener for the "keyup" event. 
// Based on the key pressed, remove the "playing" class 
// from the .drum element with matching data-key attribute.
document.addEventListener("keyup", (event: KeyboardEvent) => {
  let elm = document.querySelector(`.drum[data-key='${event.key}']`) as HTMLElement | null
  if (!elm) {
      return;
  }
  elm.classList.remove("playing");
})

// TODO: Step 3a - Implement the function handleClickDrum to be used for
// 'mousedown' events  on the .drum elements. Play the sound according 
// to the  data-sound attribute of clicked element.
function handleClickDrum(event : MouseEvent): void {
    let clickedElm = event.currentTarget as HTMLElement;    
    playSound(clickedElm.dataset.sound as string)
  addToHistory(clickedElm)
}  

// TODO: Step 4 - Register handleClickDrum as the mousedown event listener
// for ALL .drum elements. Use the document.querySelectorAll() and .forEach() methods
// to do so with no repetitious code
document.querySelectorAll<HTMLElement>(".drum").forEach(function(element : HTMLElement){
  element.addEventListener("click", handleClickDrum)
})

// TODO: Step 5a - Implement addToHistory below.
// Add a new <li> element to the historyList
// The content of the <li> element should be the same as the given 
// drum's data-key attribute.
// Each <li> element should also have an anonymous click handler that plays 
// the drum's matching sound.
function addToHistory(drum : HTMLElement): void {
  let liElm : HTMLLIElement = document.createElement("li");
  liElm.textContent = `${drum.dataset.key}`;
  historyList.appendChild(liElm); 
  

  liElm.addEventListener("click", function(event : MouseEvent){
    playSound(drum.dataset.sound as string)
})}

// TODO: Step 5b - Add calls to addToHistory in both the 
// 'keydown' listener and handleClickDrum
//DONE

// TODO: Step 6a - Add some code to the 'keydown' listener that
// toggles the class "hidden" for the historyList when "/" is typed.
// This should cause the history to become invisible/visible.
// HINT: Use the classList.toggle() method, rather than .add() or .remove()
//DONE

// TODO: Step 6b - Add some code to the 'keydown' listener that causes
// all the <li> elements to be removed, clearing the history when ? is clicked.
// HINT: Use the document.querySelectorAll and .forEach methods again!