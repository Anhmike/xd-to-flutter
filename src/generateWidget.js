const { showMessageWithColor } = require("./showMessageWithColor");
const { generateColorClass } = require("./generateColor");
const { generateStyleClass } = require("./generateStyle");
let clipboard = require("clipboard");

function onTapGenerateWidget(withSimpleCode, withDivision) {
    const styles = generateStyleClass();
    const colors = generateColorClass();
    clipboard.copyText(`${styles}\n${colors}`);
    try {
        console.log(withSimpleCode);
        console.log(withDivision);
        showMessageWithColor("Successfully generated", "green");
    } catch (error) {
        showMessageWithColor(error.toString().includes('TypeError') ? "Selected object is currently not supported" : error, "red");
    }
}

module.exports = { onTapGenerateWidget };