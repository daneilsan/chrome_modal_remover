(function(root){
    var GLOBAL_LOCK_NAME = "MODAL_BLOCKER_GLOBAL_LOCK_3jghi3d935ghb95hfjm3of3g4o";
    var GLOBAL_LOCK_WAITING_STATE = "WAITING";
    var GLOBAL_LOCK_DONE_STATE = "DONE";
    var CHECK_INTERVAL = 49;
    var DEBUG = false;
    var intervalId;


    function removeNode(nodeSelector) {
        var nodeList = document.querySelectorAll(nodeSelector);
        nodeList.forEach(function(node) {
            var parent = node.parentElement;
            parent.removeChild(node);
        });
    }

    function removeModal() {
        // fuera scroll bloqueado
        document.body.removeAttribute("class");

        // fuera modal
        var elementsToBeRemoved = [
            "section.Bloque-anuncios",
            "div.Bloque-anuncios-shadow"
        ];

        elementsToBeRemoved.forEach(removeNode);

        if (DEBUG) {
            console.log("Modal removed");
        }
    }

    function isGloballyDone() {
        return root[GLOBAL_LOCK_NAME] && root[GLOBAL_LOCK_NAME] == GLOBAL_LOCK_DONE_STATE;

    }

    function isModalActive() {
        return document.body.className && document.body.className === "disabled-vscroll";
    }

    function stopInterval() {
        clearInterval(intervalId);
    }

    function checkForActiveModal() {
        if (DEBUG) {
            console.log("Checking...");
        }

        if (isGloballyDone()){
            stopInterval();
        }

        if (isModalActive()) {
            removeModal();
            setGlobalToDone();
            stopInterval();
        }
    }

    function setGlobalToDone() {
        root[GLOBAL_LOCK_NAME] = GLOBAL_LOCK_DONE_STATE;
    }

    function isInTheSite() {
        var href = window.location.href;

        return href.indexOf("http://www.marca.com/") != -1;
    }

    function initGlobalLockIfNeeded() {
        if (!root[GLOBAL_LOCK_NAME])
            root[GLOBAL_LOCK_NAME] = GLOBAL_LOCK_WAITING_STATE;
    }

    if (isInTheSite()) {
        if (DEBUG) {
            console.log("Starting script from " + window.location.href);
        }
        initGlobalLockIfNeeded();
        intervalId = setInterval(checkForActiveModal, CHECK_INTERVAL);
    }

}(window));
