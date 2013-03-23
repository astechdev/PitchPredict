(function() {
  if (!window._inmobi) {
    var z = "http://i.w.inmobi.com/showad",
      b = "http://t.sandbox.inmobi.com/showad.asm",
      E = "pr-JSAC-CTBTC-20130228",
      h = function() {
        var H = "",
          F = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
          G;
        for (G = 0; G < 6; G++) {
          H += F.charAt(Math.floor(Math.random() * F.length))
        }
        return H
      },
      n = function() {
        return D + h()
      },
      x = {
        siteid: "mk-siteid",
        slot: "mk-ad-slot",
        age: "u-age",
        gender: "u-gender",
        location: "u-location",
        interests: "u-interests",
        postalCode: "u-postalCode",
        areaCode: "u-areaCode",
        dateOfBirth: "u-dateOfBirth",
        income: "u-income",
        latlong: "u-latlong-accu",
        education: "u-education",
        ethnicity: "u-ethnicity",
        adtype: "adtype",
        targetWindow: "targetWindow"
      },
      w = {
        "1": {
          width: 120,
          height: 20
        },
        "2": {
          width: 168,
          height: 28
        },
        "3": {
          width: 216,
          height: 36
        },
        "4": {
          width: 300,
          height: 50
        },
        "9": {
          width: 320,
          height: 48
        },
        "10": {
          width: 300,
          height: 250
        },
        "11": {
          width: 728,
          height: 90
        },
        "12": {
          width: 468,
          height: 60
        },
        "13": {
          width: 120,
          height: 600
        },
        "14": {
          width: 320,
          height: 480
        },
        "15": {
          width: 320,
          height: 50
        },
        "16": {
          width: 768,
          height: 1024
        },
        "17": {
          width: 800,
          height: 1280
        }
      },
      r = ["slot", "siteid"],
      D = "inmobi-iframe-",
      B = "",
      j = [],
      l = function(F) {
        for (var G in j) {
          if (j[G].iFrameRef === F) {
            return j[G]
          }
        }
        return null
      },
      f = function(G) {
        for (var F in j) {
          if (j[F].iFrameRef.parentNode.parentNode == G) {
            return j[F]
          }
        }
        return null
      },
      a = function(F) {
        if (typeof(F) == "object") {
          return F
        }
        if (JSON) {
          return JSON.parse(F)
        } else {
          return _inmobi.globalEval("(" + F + ")")
        }
      },
      C = function(F) {
        return w["" + F.config.slot]
      },
      v = function(I) {
        var H, F, G = I.config;
        if (G === null) {
          throw "Expected config object, got null, make sure inmobi_conf variable is set for each ad slot."
        }
        if (typeof G !== "object") {
          throw "Expected config object, got " + (typeof G) + " make sure inmobi_conf variable is set for each ad slot."
        }
        for (H = 0; H < r.length; H++) {
          F = r[H];
          if (!G.hasOwnProperty(F) || G[F] === null || G[F].length === 0) {
            throw "inmobi.js: ERROR: missing required config parameter '" + F + "'"
          }
        }
        if (!w["" + G.slot]) {
          throw "inmobi.js: ERROR: inmobi_vars config slot param, '" + G.slot + "', is not a valid slot number."
        }
      },
      y = function(H) {
        var I = [],
          F, G = H.config;
        for (F in G) {
          if (x.hasOwnProperty(F)) {
            I.push(encodeURIComponent(x[F]) + "=" + encodeURIComponent(G[F]))
          }
        }
        I.push("mk-ads=1");
        I.push("mk-version=" + encodeURIComponent(E));
        I.push("format=html");
        I.push("__t=" + (new Date()).getTime() + "-" + h());
        return I.join("&")
      },
      t = function(F) {
        var G = F.config.test ? b : z;
        return G + (G.indexOf("?") === -1 ? "?" : "&") + y(F)
      },
      m = function(I, H) {
        if (typeof H == "object" && H != null) {
          I.config = H
        }
        if (typeof I.config == "undefined" && typeof inmobi_conf == "object") {
          I.config = inmobi_conf
        }
        var K, F, G;
        console.log("load new ad called");
        window.clearTimeout(I.refresh);
        if (typeof(I.config) == "object" && typeof(I.config.autoRefresh) != "undefined") {
          F = I.config.autoRefresh - 0;
          if (!isNaN(F)) {
            if (F < 20) {
              console.log("Minimum refresh interval is 20")
            } else {
              I.refresh = window.setTimeout(function(L) {
                L.getNewAd()
              }, F * 1000, I)
            }
          } else {
            console.log("Refresh interval is invalid")
          }
        }
        try {
          if (!window.navigator.onLine) {
            return
          }
        } catch (J) {}
        if (I.adData.state == "expanded" || (I.adData.state == "loading" && typeof(I.config.adtype) != "undefined" && I.config.adtype == "int")) {
          return
        }
        try {
          K = I.iFrame.parentNode.getElementsByClassName("inmobi-rm")[0];
          if (K) {
            K.parentNode.removeChild(K)
          }
        } catch (J) {}
        v(I);
        G = C(I);
        if (!I.iFrameRef) {
          I.iFrameRef = document.createElement("iframe");
          I.iFrameRef.style.border = "none";
          I.iFrameRef.style.overflow = "hidden";
          I.iFrameRef.id = _inmobi.generateIframeId();
          I.iFrameRef.setAttribute("class", "inmobi-ad");
          I.iFrameRef.setAttribute("scrolling", "no")
        } else {
          I.iFrameRef.style.width = G.width + "px";
          I.iFrameRef.style.height = G.height + "px"
        }
        I.iFrameRef.src = t(I) + "&iframe=" + I.iFrameRef.id;
        I.iFrameRef.style.display = "block";
        I.iFrameRef.style.width = I.iFrameRef.parentNode.style.width = G.width + "px";
        I.iFrameRef.style.height = I.iFrameRef.parentNode.style.height = G.height + "px";
        return I
      },
      p = function(H, G) {
        var I = H.iFrameRef.parentNode.getElementsByClassName("inmobi-rm")[0],
          F = H.iFrameRef.id.replace(/iframe/, "div");
        if (!I) {
          I = H.iFrameRef.parentNode.insertBefore(document.createElement("div"), H.iFrameRef);
          I.id = F;
          I.className = "inmobi-rm"
        }
        I.innerHTML = G.html;
        scripts = I.getElementsByTagName("script");
        for (i = 0; i < scripts.length; i++) {
          script = scripts[i];
          if (script.src) {
            newScript = I.ownerDocument.createElement("script");
            newScript.src = script.src;
            if (script.parentNode) {
              script.parentNode.replaceChild(newScript, script)
            }
          } else {
            _inmobi.globalEval(script.textContent)
          }
        }
        I.style.width = G.width + "px";
        I.style.height = G.height + "px";
        H.iFrameRef.style.display = "none"
      },
      q = function(M, K) {
        var L = M.adData,
          G = K.url,
          J = K.expandProperties,
          H, N, I = M.config,
          F = M.iFrameRef;
        if (L.state == "expanded") {
          M.postToContainer("fireEvent", {
            event: "error",
            eventData: "Can expanded when in expanded state."
          });
          return
        }
        if (typeof(G) != "undefined" && G != null && G != "") {
          F.src = G
        }
        if (typeof(J.width) == "undefined") {
          J.width = 0
        }
        if (typeof(J.height) == "undefined") {
          J.height = 0
        }
        if (typeof(J.useCustomClose) == "undefined") {
          J.useCustomClose = false
        }
        if (typeof(J.isModal) == "undefined") {
          J.isModal = false
        }
        if (isNaN(parseInt(J.width))) {
          J.width = 0
        }
        if (isNaN(parseInt(J.height))) {
          J.height = 0
        }
        if (J.width == 0) {
          J.width = window.innerWidth
        }
        if (J.height == 0) {
          J.height = window.innerHeight
        }
        if (J.width > 0) {
          F.parentNode.style.width = F.style.width = J.width + "px"
        }
        if (J.height > 0) {
          F.parentNode.style.height = F.style.height = J.height + "px"
        }
        if (!J.useCustomClose) {
          H = document.createElement("div");
          H.setAttribute("class", "inmobi-close-button");
          N = (parseInt(F.style.width) - 50);
          N = (N > 0 ? N : 0) + "px";
          H.setAttribute("style", "position: absolute; margin-left:" + N + ";");
          H.innerHTML = "<img src='http://inmobi-sandbox.s3.amazonaws.com/image/close.png' width='50px' height='50px' onclick='window._inmobi.closeAd(window._inmobi.getAd(event.target.parentNode.parentNode.getElementsByTagName(\"iframe\")[0]));' />";
          F.parentNode.insertBefore(H, F.parentNode.firstChild)
        }
        if ((typeof(I.adtype) == "undefined") || I.adtype != "int") {
          L.state = "expanded";
          M.postToContainer("fireEvent", {
            event: "stateChange",
            eventData: "expanded"
          })
        }
      },
      e = function(G) {
        var F = C(G);
        G.iFrameRef.parentNode.style.width = G.iFrameRef.style.width = F.width + "px";
        G.iFrameRef.parentNode.style.height = G.iFrameRef.style.height = F.height + "px"
      },
      c = function(F) {
        k(F)
      },
      k = function(H) {
        var I = H.iFrameRef.parentNode.getElementsByClassName("inmobi-close-button"),
          G = H.config,
          F = H.adData;
        if (I.length > 0) {
          I[0].parentNode.removeChild(I[0])
        }
        if ((typeof(G.adtype) == "undefined") || G.adtype != "int") {
          if (F.state != "expanded") {
            H.postToContainer("fireEvent", {
              event: "error",
              eventData: "Can't close a non-expanded ad."
            });
            return
          }
          e(H);
          F.state = "default";
          H.postToContainer("fireEvent", {
            event: "stateChange",
            eventData: "default"
          })
        } else {
          F.state = "init";
          H.iFrameRef.parentNode.style.height = H.iFrameRef.style.height = "0px";
          H.iFrameRef.src = "";
          _inmobi.dispatchEvent("close", {
            container: H.iFrameRef.parentNode
          })
        }
      },
      o = function(F, G) {
        return {
          iFrameRef: F,
          config: G,
          adData: {
            state: "init"
          },
          refresh: null,
          getNewAd: function(H) {
            return m(this, H)
          },
          postToContainer: function(I, H) {
            this.iFrameRef.contentWindow.postMessage({
              action: I,
              data: H,
              inmobiMessage: true
            }, "*")
          }
        }
      },
      g = function(H) {
        var F, I, G = null;
        for (F = 0; F < j.length; F++) {
          if (j[F].iFrameRef.contentWindow === H.source) {
            G = j[F]
          }
        }
        if (G != null) {
          I = a(H.data);
          if (I.action != undefined) {
            B = I.action
          }
          switch (I.topic) {
          case "showAdInParent":
            p(G, I.ad);
            break;
          case "nfr":
            if (typeof G.config.onError == "function") {
              G.config.onError("nfr")
            }
            break
          }
          switch (I.action) {
          case "error":
            if (typeof G.config.onError == "function") {
              G.config.onError(I.data.message)
            }
            break;
          case "collapse":
            c(G);
            break;
          case "close":
            c(G);
            break;
          case "expand":
            q(G, I.data);
            break;
          case "log":
            console.log(I.data);
            break
          }
        }
      },
      A = function(F) {
        var G = "";
        if (typeof(F) != "undefined" && typeof(F.sticky) != "undefined") {
          switch (F.sticky) {
          case "top":
          case "left":
            G = "top:0px;left:0px;";
            break;
          case "right":
            G = "top:0px;right:0px;";
            break;
          case "bottom":
            G = "bottom:0px;left:0px;";
            break
          }
        }
        if (G == "") {
          return ""
        }
        return "position:fixed;" + G
      },
      d = function(F) {
        console.log(F);
        var I = n(),
          J = "",
          H, G;
        J = A(F);
        document.write('<div style="display:inline-block;' + J + '"><iframe scrolling="no" class="inmobi-ad" id="' + I + '" style="border:none;overflow:hidden;"></iframe></div>');
        H = document.getElementById(I);
        G = o(H, F);
        u(G, F)
      },
      s = function(F) {
        var I = n(),
          J = "",
          H, G;
        J = A(F);
        H = document.createElement("iframe"), div = document.createElement("div");
        div.setAttribute("style", "display:inline-block;" + J);
        H.setAttribute("scrolling", "no");
        H.setAttribute("class", "inmobi-ad");
        H.setAttribute("id", I);
        H.setAttribute("style", "border:none;overflow:hidden;");
        div.appendChild(H);
        G = o(H, F);
        u(G, F);
        return div
      },
      u = function(G, F) {
        G.iFrameRef.width = G.iFrameRef.style.width = "0px";
        G.iFrameRef.height = G.iFrameRef.style.height = "0px";
        G.iFrameRef.style.backgroundColor = "white";
        j.push(G);
        if (!(typeof(F) != "undefined" && typeof(F.manual) != "undefined" && F.manual)) {
          G.getNewAd()
        }
        if (typeof F.onLoad == "function") {
          iframe.addEventListener("load", function(H) {
            F.onLoad(H)
          }, false)
        }
      };
    window._inmobi = {
      events: ["close"],
      listeners: {},
      getNewAd: function(H, F) {
        var G = f(H);
        if (G == null) {
          try {
            if (typeof F != "object") {
              F = window.inmobi_conf
            }
            H.appendChild(s(F))
          } catch (I) {
            console.log("IM: Something went wrong. Please check integration. Error: " + I)
          }
        } else {
          if (typeof G == "object") {
            G.getNewAd(F)
          }
        }
      },
      getAd: function(G, F) {
        return l(G)
      },
      closeAd: function(F) {
        k(F)
      },
      addEventListener: function(F, G) {
        if (this.events.indexOf(F) == -1) {
          throw "inmobi.js: ERROR: Unknown event type '" + F + "'"
        }
        if (!this.listeners[F]) {
          this.listeners[F] = []
        }
        this.listeners[F].push(G)
      },
      dispatchEvent: function(H, F) {
        var G;
        if (this.events.indexOf(H) == -1) {
          throw "inmobi.js: ERROR: Unknown event type '" + H + "'"
        }
        if (!this.listeners[H]) {
          return
        }
        for (G = 0; G < this.listeners[H].length; G++) {
          (this.listeners[H][G])(F)
        }
      }
    };
    window.addEventListener("message", g, false)
  }
  if (typeof inmobi_conf == "undefined") {
    inmobi_conf = {
      manual: true
    }
  }
  if (!inmobi_conf.manual) {
    d(inmobi_conf)
  }
})();
(function() {
  if (!window._inmobi.globalEval) {
    window._inmobi.globalEval = function(a) {
      return eval(a)
    }
  }
})();