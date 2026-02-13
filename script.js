Blockly.Blocks['event_player_join'] = {
    init: function() {
        this.appendDummyInput().appendField("플레이어 접속 시");
        this.setNextStatement(true, null);
        this.setColour(40);
    }
}

Blockly.Blocks['action_send_message'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("메시지: ")
            .appendField(new Blockly.FieldTextInput("환영합니다!"), "MSG");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
    }
}

const workspace = Blockly.inject('blocklyDiv', {
    toolbox: document.getElementById('toolbox'),
    theme: Blockly.Themes.Dark,
    grid: { spacing: 20, length: 3, colour: '#444', snap: true },
    zoom: { controls: true, wheel: true, startScale: 1.0, maxScale: 3, minScale: 0.3, scaleSpeed: 1.2 }
});

function saveConfig(){
    const scriptName = document.getElementById('scriptName').value.trim();

    if (!scriptName){
        alert("⚠️ 저장하기 전에 스크립트 이름을 입력해주세요!");
        document.getElementById('scriptName').focus();
        return;
    }

    const state = Blockly.serialization.workspaces.save(workspace);
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${scriptName}.json`;
    link.click();

    URL.revokeObjectURL(url);
}