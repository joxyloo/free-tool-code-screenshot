
document.getElementById('cs_exportButton').addEventListener('click', cs_downloadImage);
document.getElementById('cs_padding').addEventListener('input', cs_updatePadding);
document.getElementById('cs_fontSize').addEventListener('input', cs_updateFontSize);
document.getElementById("cs_codeInput").addEventListener("input", cs_updateCodePreview);
document.getElementById('cs_gradientCheckbox').addEventListener('click', cs_showGradientSelector);
document.getElementById('cs_gradientAngle').addEventListener('input', cs_updateBackgroundColor);

document.getElementById("cs_codeInput").addEventListener("keydown", cs_handleTab);


function cs_downloadImage() {
  domtoimage.toJpeg(document.getElementById('cs_codeContainer')).then(function (ss_dataUrl) {
    var ss_link = document.createElement('a');
    ss_link.download = 'code.jpeg';
    ss_link.href = ss_dataUrl;
    ss_link.click();
  });
}

function cs_updatePadding() {
  const padding = document.getElementById('cs_padding').value;
  const codeWindow = document.getElementById("cs_codeWindow");
  codeWindow.style.width = `${750 - padding}px`;  // Increase width
  codeWindow.style.height = `${550 - padding}px`; // Increase height
}


function cs_updateFontSize(){
  const fontSize = document.getElementById('cs_fontSize').value;
  const codeInput = document.getElementById('cs_codeInput');
  const codePreview = document.getElementById("cs_codePreview");
  codePreview.style.fontSize = `${fontSize}px`;
  codeInput.style.fontSize = `${fontSize}px`;
  codeInput.style.padding = `${21+(fontSize-11)}px`;
}

function cs_copyTextToEditor(text){
  const highlightedCode = hljs.highlightAuto(text).value;
  const codePreview = document.getElementById("cs_codePreview");
  codePreview.innerHTML = highlightedCode;
}

function cs_updateCodePreview(text){
  if (typeof(text) !== 'string'){
    text = document.getElementById("cs_codeInput").value;
  }
  const highlightedCode = hljs.highlightAuto(text).value;
  const codePreview = document.getElementById("cs_codePreview");
  codePreview.innerHTML = highlightedCode;
}

function cs_handleTab(e){
  if (e.key === "Tab") {
    e.preventDefault();
    const start = this.selectionStart;
    const end = this.selectionEnd;
    this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);
    this.selectionStart = this.selectionEnd = start + 1;
  }
}

function cs_updateBackgroundColor(){
  const colorPicker = document.getElementById('cs_colorpicker');
  const color = colorPicker.style.background;

  const secondColorpicker = document.getElementById('cs_secondColorPicker');
  const secondColor = secondColorpicker.style.background;

  const angle = document.getElementById('cs_gradientAngle').value;
  const isUseGradient = document.getElementById('cs_gradientCheckbox').checked;

  const codeContainer = document.getElementById('cs_codeContainer');
  codeContainer.style.background = isUseGradient ? `linear-gradient(${angle}deg, ${secondColor}, ${color})` : color;
}

function cs_showGradientSelector(e) {
  const isChecked = e.target.checked;
  const gradientSelectorContainer = document.getElementById('cs_gradientSelectorContainer');
  gradientSelectorContainer.style.display = isChecked ? 'flex' : 'none';
  gradientSelectorContainer.style.visibility = isChecked ? 'visible' : 'hidden';
  cs_updateBackgroundColor();
}


var cs_parent = document.querySelector('#cs_colorpicker');
var cs_picker = new Picker(cs_parent);

cs_picker.onClose = function(color) { //onDone is not working
  cs_parent.style.background = color.rgbaString;
  cs_updateBackgroundColor();
};

var cs_secondParent = document.querySelector('#cs_secondColorPicker');
var cs_secondPicker = new Picker(cs_secondParent);

cs_secondPicker.onClose = function(color) {
  cs_secondParent.style.background = color.rgbaString;
  cs_updateBackgroundColor()
};


const cs_placehodlderText = `import Bannerbear from "bannerbear";

const bb = new Bannerbear("your api key");

const createImage = async () => {
  const params: Bannerbear.CreateImageParams = {
    metadata: [],
  };

const image = await bb.create_image("image uid", params);
};

createImage();`

document.getElementById("cs_codeInput").value = cs_placehodlderText;
cs_updateCodePreview(cs_placehodlderText);
cs_updatePadding();
cs_updateBackgroundColor();