Blockly.Blocks['event_player_join'] = {
    init: function() {
        this.appendDummyInput().appendField("[이벤트] 플레이어 접속시");
        this.appendStatementInput("DO").setCheck(null);
        this.setColour("#FFB900");
    }
};

Blockly.Blocks['event_player_quit'] = {
    init: function() {
        this.appendDummyInput().appendField("[이벤트] 플레이어 퇴장 시");
        this.appendStatementInput("DO").setCheck(null);
        this.setColour("#FFB900");
    }
};

Blockly.Blocks['event_block_break'] = {
    init: function() {
        this.appendDummyInput().appendField("[이벤트] 블록을 부쉈을 때");
        this.appendStatementInput("DO").setCheck(null);
        this.setColour("#FFB900");
    }
};

Blockly.Blocks['event_player_chat'] = {
    init: function() {
        this.appendDummyInput().appendField("[이벤트] 채팅을 쳤을 때");
        this.appendStatementInput("DO").setCheck(null);
        this.setColour("#FFB900");
    }
};
//------------------------------------------------------------------------------
Blockly.Blocks['placeholder_event_block'] = {
    init: function() {
        this.appendDummyInput().appendField("이벤트-블록");
        this.setOutput(true, "String");
        this.setColour("#9B59B6");
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

Blockly.Blocks['text_value'] = {
    init: function() {
        this.appendDummyInput().appendField('"').appendField(new Blockly.FieldTextInput("입력"), "TEXT").appendField('"');
        this.setOutput(true, "String");
        this.setColour("#5bc0de");
    }
};
//------------------------------------------------------------------------------

Blockly.Blocks['action_send_msg_to'] = {
    init: function() {
        this.appendValueInput("TARGET").setCheck(["String", "Player"]).appendField("대상:");
        this.appendDummyInput().appendField("에게").appendField(new Blockly.FieldTextInput("내용"), "MSG").appendField("전송");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#5BBD72");
    }
};

Blockly.Blocks['action_give_item'] = {
    init: function() {
        this.appendValueInput("TARGET").setCheck("String").appendField("대상:");
        this.appendDummyInput().appendField("에게").appendField(new Blockly.FieldTextInput("DIAMOND"), "ITEM").appendField(new Blockly.FieldNumber(1), "AMOUNT").appendField("개 지급");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#5BBD72");
    }
};

Blockly.Blocks['action_explosion'] = {
    init: function() {
        this.appendDummyInput().appendField("위치에 폭발 생성");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#e74c3c");
    }
};
//------------------------------------------------------------------------------

Blockly.Blocks['condition_if'] = {
    init: function() {
        this.appendValueInput("CONDITION").setCheck("Boolean").appendField("만약");
        this.appendStatementInput("DO").appendField("실행:");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#4A90E2");
    }
};

Blockly.Blocks['logic_compare'] = {
    init: function() {
        this.appendValueInput("A").setCheck(null);
        this.appendDummyInput().appendField("=");
        this.appendValueInput("B").setCheck(null);
        this.setOutput(true, "Boolean");
        this.setInputsInline(true);
        this.setColour("#4A90E2");
    }
};
//------------------------------------------------------------------------------

const workspace = Blockly.inject('blocklyDiv', {
    toolbox: document.getElementById('toolbox'),
    theme: Blockly.Themes.Dark,
    grid: { spacing: 20, length: 3, colour: '#444', snap: true },
    zoom: { controls: true, wheel: true, startScale: 1.0, maxScale: 3, minScale: 0.3, scaleSpeed: 1.2 },
    move: { scrollbars: true, drag: true, wheel: true }
});

const workspaceSearch = new WorkspaceSearch(workspace);
workspaceSearch.init();

document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        workspaceSearch.open();
    }
});

function saveConfig(){
    const scriptName = document.getElementById('scriptName').value.trim();
    if (!scriptName){
        alert("⚠️ 스크립트 이름을 입력해주세요!");
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