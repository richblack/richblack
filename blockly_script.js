var toolbox = {
    "kind": "categoryToolbox",
    "contents": [
        {
            "kind": "category",
            "name": "邏輯 (Logic)",
            "colour": "%{BKY_LOGIC_HUE}",
            "contents": [
                {"kind": "block", "type": "controls_if"},
                {"kind": "block", "type": "logic_compare"},
                {"kind": "block", "type": "logic_operation"},
                {"kind": "block", "type": "logic_negate"},
                {"kind": "block", "type": "logic_boolean"},
                {"kind": "block", "type": "logic_null"},
                {"kind": "block", "type": "logic_ternary"}
            ]
        },
        {
            "kind": "category",
            "name": "循環 (Loop)",
            "colour": "%{BKY_LOOPS_HUE}",
            "contents": [
                {"kind": "block", "type": "controls_repeat_ext"},
                {"kind": "block", "type": "controls_whileUntil"},
                {"kind": "block", "type": "controls_for"},
                {"kind": "block", "type": "controls_forEach"},
                {"kind": "block", "type": "controls_flow_statements"}
            ]
        },
        {
            "kind": "category",
            "name": "數學 (Math)",
            "colour": "%{BKY_MATH_HUE}",
            "contents": [
                {"kind": "block", "type": "math_number"},
                {"kind": "block", "type": "math_arithmetic"},
                {"kind": "block", "type": "math_single"},
                {"kind": "block", "type": "math_trig"},
                {"kind": "block", "type": "math_constant"},
                {"kind": "block", "type": "math_number_property"},
                {"kind": "block", "type": "math_round"},
                {"kind": "block", "type": "math_on_list"},
                {"kind": "block", "type": "math_modulo"},
                {"kind": "block", "type": "math_constrain"},
                {"kind": "block", "type": "math_random_int"},
                {"kind": "block", "type": "math_random_float"},
                {"kind": "block", "type": "math_atan2"}
            ]
        },
        {
            "kind": "category",
            "name": "文本 (Text)",
            "colour": "%{BKY_TEXTS_HUE}",
            "contents": [
                {"kind": "block", "type": "text"},
                {"kind": "block", "type": "text_join"},
                {"kind": "block", "type": "text_append"},
                {"kind": "block", "type": "text_length"},
                {"kind": "block", "type": "text_isEmpty"},
                {"kind": "block", "type": "text_indexOf"},
                {"kind": "block", "type": "text_charAt"},
                {"kind": "block", "type": "text_getSubstring"},
                {"kind": "block", "type": "text_changeCase"},
                {"kind": "block", "type": "text_trim"},
                {"kind": "block", "type": "text_print"},
                {"kind": "block", "type": "text_prompt_ext"}
            ]
        },
        {
            "kind": "category",
            "name": "列表 (List)",
            "colour": "%{BKY_LISTS_HUE}",
            "contents": [
                {"kind": "block", "type": "lists_create_with"},
                {"kind": "block", "type": "lists_repeat"},
                {"kind": "block", "type": "lists_length"},
                {"kind": "block", "type": "lists_isEmpty"},
                {"kind": "block", "type": "lists_indexOf"},
                {"kind": "block", "type": "lists_getIndex"},
                {"kind": "block", "type": "lists_setIndex"},
                {"kind": "block", "type": "lists_getSublist"},
                {"kind": "block", "type": "lists_split"},
                {"kind": "block", "type": "lists_sort"}
            ]
        },
        {
            "kind": "category",
            "name": "變量 (Variable)",
            "custom": "VARIABLE",
            "colour": "%{BKY_VARIABLES_HUE}"
        },
        {
            "kind": "category",
            "name": "函數 (Function)",
            "custom": "PROCEDURE",
            "colour": "%{BKY_PROCEDURES_HUE}"
        },
        {
            "kind": "category",
            "name": "輸入/輸出 (In/Output)",
            "colour": "#A56E5C",
            "contents": [
                {"kind": "block", "type": "text_print"},
                {"kind": "block", "type": "text_prompt_ext"}
            ]
        }
    ]
};

var workspace;
var darkTheme;
var lightTheme;

function initBlockly() {
    darkTheme = Blockly.Theme.defineTheme('dark', {
        'base': Blockly.Themes.Classic,
        'componentStyles': {
            'workspaceBackgroundColour': '#1e1e1e',
            'toolboxBackgroundColour': '#333',
            'toolboxForegroundColour': '#fff',
            'flyoutBackgroundColour': '#252526',
            'flyoutForegroundColour': '#ccc',
            'flyoutOpacity': 1,
            'scrollbarColour': '#797979',
            'insertionMarkerColour': '#fff',
            'insertionMarkerOpacity': 0.3,
            'scrollbarOpacity': 0.4,
            'cursorColour': '#d0d0d0',
        }
    });

    lightTheme = Blockly.Themes.Classic;

    workspace = Blockly.inject('blocklyDiv', {
        toolbox: toolbox,
        zoom: {
            controls: true,
            wheel: true,
            startScale: 1.0,
            maxScale: 3,
            minScale: 0.3,
            scaleSpeed: 1.2
        },
        trashcan: true,
        theme: lightTheme
    });
}

function toggleDarkMode() {
    var body = document.body;
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        workspace.setTheme(darkTheme);
    } else {
        workspace.setTheme(lightTheme);
    }
}

function saveBlocks() {
    var json = Blockly.serialization.workspaces.save(workspace);
    var jsonText = JSON.stringify(json);
    var blob = new Blob([jsonText], {type: 'application/json'});
    var a = document.createElement('a');
    a.download = 'python_blocks.json';
    a.href = URL.createObjectURL(blob);
    a.click();
}

function loadBlocks() {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            try {
                var json = JSON.parse(e.target.result);
                workspace.clear();
                Blockly.serialization.workspaces.load(json, workspace);
            } catch (error) {
                alert('載入失敗。請確保選擇了正確的 Blockly JSON 文件。');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

function togglePythonCode() {
    var codeDiv = document.getElementById('pythonCode');
    if (codeDiv.style.display === 'none' || codeDiv.style.display === '') {
        var code = Blockly.Python.workspaceToCode(workspace);
        document.getElementById('pythonCodeContent').textContent = code;
        showPopup('pythonCode');
    } else {
        closePopup('pythonCode');
    }
}

function copyPythonCode() {
    var code = Blockly.Python.workspaceToCode(workspace);
    navigator.clipboard.writeText(code).then(function() {
        alert('Python 程式碼已複製到剪貼板');
    }, function(err) {
        alert('複製失敗，請手動複製程式碼。');
    });
}

function downloadPythonCode() {
    var code = Blockly.Python.workspaceToCode(workspace);
    var blob = new Blob([code], {type: 'text/plain'});
    var a = document.createElement('a');
    a.download = 'python_code.py';
    a.href = URL.createObjectURL(blob);
    a.click();
}

function toggleJson() {
    var jsonDiv = document.getElementById('jsonContent');
    if (jsonDiv.style.display === 'none' || jsonDiv.style.display === '') {
        var json = Blockly.serialization.workspaces.save(workspace);
        var jsonText = JSON.stringify(json, null, 2);
        document.getElementById('jsonContentText').textContent = jsonText;
        showPopup('jsonContent');
    } else {
        closePopup('jsonContent');
    }
}

function clearWorkspace() {
    workspace.clear();
}

function showPopup(id) {
    document.getElementById(id).style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function closePopup(id) {
    document.getElementById(id).style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function onResize() {
    Blockly.svgResize(workspace);
}

window.addEventListener('load', initBlockly);
window.addEventListener('resize', onResize, false);

document.getElementById('overlay').addEventListener('click', function() {
    closePopup('pythonCode');
    closePopup('jsonContent');
});
