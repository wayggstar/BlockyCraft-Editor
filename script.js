Blockly.Blocks['event_player_join'] = {
    init: function() {
        this.appendDummyInput().appendField("🚀 [이벤트] 플레이어 접속");
        this.appendStatementInput("DO").setCheck(null);
        this.setColour("#FFB900");
        this.setTooltip("플레이어 접속 시 실행");
    }
};

Blockly.Blocks['placeholder_event_player'] = {
  init: function() {
    this.appendDummyInput().appendField("👤 event-player");
    this.setOutput(true, "String");
    this.setColour("#9B59B6");
  }
};

Blockly.Blocks['placeholder_event_world'] = {
  init: function() {
    this.appendDummyInput().appendField("🌍 event-world");
    this.setOutput(true, "String");
    this.setColour("#9B59B6");
  }
};
//------------------------------------------------------------------------------------------
Blockly.Blocks['action_send_msg_to'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["플레이어", "PLAYER"], ["전체", "ALL"]]), "TARGET")
        .appendField("에게 메시지 전송:");
    this.appendValueInput("CONTENT").setCheck(["String", "Number"]);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#5BBD72");
    this.setInputsInline(true);
  }
};
//------------------------------------------------------------------------------------------

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