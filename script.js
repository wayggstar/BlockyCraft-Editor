Blockly.Blocks['event_player_join'] = {
    init: function() {
        this.appendDummyInput().appendField("[이벤트] 플레이어 접속시");
        this.appendStatementInput("DO").setCheck(null);
        this.setColour("#FFB900");
        this.setTooltip("플레이어 접속 시 실행");
    }
};

Blockly.Blocks['placeholder_event_player'] = {
  init: function() {
    this.appendDummyInput().appendField("이벤트-플레이어");
    this.setOutput(true, "String");
    this.setColour("#9B59B6");
  }
};

Blockly.Blocks['placeholder_event_world'] = {
  init: function() {
    this.appendDummyInput().appendField("이벤트-월드");
    this.setOutput(true, "String");
    this.setColour("#9B59B6");
  }
};

Blockly.Blocks['target_all_players'] = {
  init: function() {
    this.appendDummyInput().appendField("전체 플레이어");
    this.setOutput(true, "String");
    this.setColour("#9B59B6");
  }
};
//------------------------------------------------------------------------------------------
Blockly.Blocks['action_send_msg_to'] = {
  init: function() {
    this.appendValueInput("TARGET")
        .setCheck(["String", "Player"])
        .appendField("대상:");

    this.appendDummyInput()
        .appendField("에게")
        .appendField(new Blockly.FieldTextInput("메시지 내용을 입력하세요"), "MSG") // 바로 입력!
        .appendField("메시지 전송");

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#5BBD72");
    this.setTooltip("대상을 지정하여 메시지를 보냅니다.");
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