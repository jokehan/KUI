/*---------- 以下是sweetalert脚本库 ----------*/

!
function(e, t, n) {
	"use strict";
	!
	function o(e, t, n) {
		function a(s, l) {
			if (!t[s]) {
				if (!e[s]) {
					var i = "function" == typeof require && require;
					if (!l && i) return i(s, !0);
					if (r) return r(s, !0);
					var u = new Error("Cannot find module '" + s + "'");
					throw u.code = "MODULE_NOT_FOUND", u
				}
				var c = t[s] = {
					exports: {}
				};
				e[s][0].call(c.exports, function(t) {
					var n = e[s][1][t];
					return a(n ? n : t)
				}, c, c.exports, o, e, t, n)
			}
			return t[s].exports
		}
		for (var r = "function" == typeof require && require, s = 0; s < n.length; s++) a(n[s]);
		return a
	}({
		1: [function(o, a, r) {
			function s(e) {
				return e && e.__esModule ? e : {
					"default": e
				}
			}
			Object.defineProperty(r, "__esModule", {
				value: !0
			});
			var l, i, u, c, d = o("./modules/handle-dom"),
				f = o("./modules/utils"),
				p = o("./modules/handle-swal-dom"),
				m = o("./modules/handle-click"),
				v = o("./modules/handle-key"),
				y = s(v),
				b = o("./modules/default-params"),
				h = s(b),
				g = o("./modules/set-params"),
				w = s(g);
			r["default"] = u = c = function() {
				function o(e) {
					var t = a;
					return t[e] === n ? h["default"][e] : t[e]
				}
				var a = arguments[0];
				if ((0, d.addClass)(t.body, "stop-scrolling"), (0, p.resetInput)(), a === n) return (0, f.logStr)("SweetAlert expects at least 1 attribute!"), !1;
				var r = (0, f.extend)({}, h["default"]);
				switch (typeof a) {
				case "string":
					r.title = a, r.text = arguments[1] || "", r.type = arguments[2] || "";
					break;
				case "object":
					if (a.title === n) return (0, f.logStr)('Missing "title" argument!'), !1;
					r.title = a.title;
					for (var s in h["default"]) r[s] = o(s);
					r.confirmButtonText = r.showCancelButton ? "Confirm" : h["default"].confirmButtonText, r.confirmButtonText = o("confirmButtonText"), r.doneFunction = arguments[1] || null;
					break;
				default:
					return (0, f.logStr)('Unexpected type of argument! Expected "string" or "object", got ' + typeof a), !1
				}(0, w["default"])(r), (0, p.fixVerticalPosition)(), (0, p.openModal)(arguments[1]);
				for (var u = (0, p.getModal)(), v = u.querySelectorAll("button"), b = ["onclick", "onmouseover", "onmouseout", "onmousedown", "onmouseup", "onfocus"], g = function(e) {
						return (0, m.handleButton)(e, r, u)
					}, C = 0; C < v.length; C++) for (var S = 0; S < b.length; S++) {
					var x = b[S];
					v[C][x] = g
				}(0, p.getOverlay)().onclick = g, l = e.onkeydown;
				var k = function(e) {
						return (0, y["default"])(e, r, u)
					};
				e.onkeydown = k, e.onfocus = function() {
					setTimeout(function() {
						i !== n && (i.focus(), i = n)
					}, 0)
				}, c.enableButtons()
			}, u.setDefaults = c.setDefaults = function(e) {
				if (!e) throw new Error("userParams is required");
				if ("object" != typeof e) throw new Error("userParams has to be a object");
				(0, f.extend)(h["default"], e)
			}, u.close = c.close = function() {
				var o = (0, p.getModal)();
				(0, d.fadeOut)((0, p.getOverlay)(), 5), (0, d.fadeOut)(o, 5), (0, d.removeClass)(o, "showSweetAlert"), (0, d.addClass)(o, "hideSweetAlert"), (0, d.removeClass)(o, "visible");
				var a = o.querySelector(".sa-icon.sa-success");
				(0, d.removeClass)(a, "animate"), (0, d.removeClass)(a.querySelector(".sa-tip"), "animateSuccessTip"), (0, d.removeClass)(a.querySelector(".sa-long"), "animateSuccessLong");
				var r = o.querySelector(".sa-icon.sa-error");
				(0, d.removeClass)(r, "animateErrorIcon"), (0, d.removeClass)(r.querySelector(".sa-x-mark"), "animateXMark");
				var s = o.querySelector(".sa-icon.sa-warning");
				return (0, d.removeClass)(s, "pulseWarning"), (0, d.removeClass)(s.querySelector(".sa-body"), "pulseWarningIns"), (0, d.removeClass)(s.querySelector(".sa-dot"), "pulseWarningIns"), setTimeout(function() {
					var e = o.getAttribute("data-custom-class");
					(0, d.removeClass)(o, e)
				}, 300), (0, d.removeClass)(t.body, "stop-scrolling"), e.onkeydown = l, e.previousActiveElement && e.previousActiveElement.focus(), i = n, clearTimeout(o.timeout), !0
			}, u.showInputError = c.showInputError = function(e) {
				var t = (0, p.getModal)(),
					n = t.querySelector(".sa-input-error");
				(0, d.addClass)(n, "show");
				var o = t.querySelector(".sa-error-container");
				(0, d.addClass)(o, "show"), o.querySelector("p").innerHTML = e, setTimeout(function() {
					u.enableButtons()
				}, 1), t.querySelector("input").focus()
			}, u.resetInputError = c.resetInputError = function(e) {
				if (e && 13 === e.keyCode) return !1;
				var t = (0, p.getModal)(),
					n = t.querySelector(".sa-input-error");
				(0, d.removeClass)(n, "show");
				var o = t.querySelector(".sa-error-container");
				(0, d.removeClass)(o, "show")
			}, u.disableButtons = c.disableButtons = function(e) {
				var t = (0, p.getModal)(),
					n = t.querySelector("button.confirm"),
					o = t.querySelector("button.cancel");
				n.disabled = !0, o.disabled = !0
			}, u.enableButtons = c.enableButtons = function(e) {
				var t = (0, p.getModal)(),
					n = t.querySelector("button.confirm"),
					o = t.querySelector("button.cancel");
				n.disabled = !1, o.disabled = !1
			}, "undefined" != typeof e ? e.sweetAlert = e.swal = u : (0, f.logStr)("SweetAlert is a frontend module!"), a.exports = r["default"]
		}, {
			"./modules/default-params": 2,
			"./modules/handle-click": 3,
			"./modules/handle-dom": 4,
			"./modules/handle-key": 5,
			"./modules/handle-swal-dom": 6,
			"./modules/set-params": 8,
			"./modules/utils": 9
		}],
		2: [function(e, t, n) {
			Object.defineProperty(n, "__esModule", {
				value: !0
			});
			var o = {
				title: "",
				text: "",
				type: null,
				allowOutsideClick: !1,
				showConfirmButton: !0,
				showCancelButton: !1,
				closeOnConfirm: !0,
				closeOnCancel: !0,
				confirmButtonText: "OK",
				confirmButtonColor: "#8CD4F5",
				cancelButtonText: "Cancel",
				imageUrl: null,
				imageSize: null,
				timer: null,
				customClass: "",
				html: !1,
				animation: !0,
				allowEscapeKey: !0,
				inputType: "text",
				inputPlaceholder: "",
				inputValue: "",
				showLoaderOnConfirm: !1
			};
			n["default"] = o, t.exports = n["default"]
		}, {}],
		3: [function(t, n, o) {
			Object.defineProperty(o, "__esModule", {
				value: !0
			});
			var a = t("./utils"),
				r = (t("./handle-swal-dom"), t("./handle-dom")),
				s = function(t, n, o) {
					function s(e) {
						m && n.confirmButtonColor && (p.style.backgroundColor = e)
					}
					var u, c, d, f = t || e.event,
						p = f.target || f.srcElement,
						m = -1 !== p.className.indexOf("confirm"),
						v = -1 !== p.className.indexOf("sweet-overlay"),
						y = (0, r.hasClass)(o, "visible"),
						b = n.doneFunction && "true" === o.getAttribute("data-has-done-function");
					switch (m && n.confirmButtonColor && (u = n.confirmButtonColor, c = (0, a.colorLuminance)(u, -.04), d = (0, a.colorLuminance)(u, -.14)), f.type) {
					case "mouseover":
						s(c);
						break;
					case "mouseout":
						s(u);
						break;
					case "mousedown":
						s(d);
						break;
					case "mouseup":
						s(c);
						break;
					case "focus":
						var h = o.querySelector("button.confirm"),
							g = o.querySelector("button.cancel");
						m ? g.style.boxShadow = "none" : h.style.boxShadow = "none";
						break;
					case "click":
						var w = o === p,
							C = (0, r.isDescendant)(o, p);
						if (!w && !C && y && !n.allowOutsideClick) break;
						m && b && y ? l(o, n) : b && y || v ? i(o, n) : (0, r.isDescendant)(o, p) && "BUTTON" === p.tagName && sweetAlert.close()
					}
				},
				l = function(e, t) {
					var n = !0;
					(0, r.hasClass)(e, "show-input") && (n = e.querySelector("input").value, n || (n = "")), t.doneFunction(n), t.closeOnConfirm && sweetAlert.close(), t.showLoaderOnConfirm && sweetAlert.disableButtons()
				},
				i = function(e, t) {
					var n = String(t.doneFunction).replace(/\s/g, ""),
						o = "function(" === n.substring(0, 9) && ")" !== n.substring(9, 10);
					o && t.doneFunction(!1), t.closeOnCancel && sweetAlert.close()
				};
			o["default"] = {
				handleButton: s,
				handleConfirm: l,
				handleCancel: i
			}, n.exports = o["default"]
		}, {
			"./handle-dom": 4,
			"./handle-swal-dom": 6,
			"./utils": 9
		}],
		4: [function(n, o, a) {
			Object.defineProperty(a, "__esModule", {
				value: !0
			});
			var r = function(e, t) {
					return new RegExp(" " + t + " ").test(" " + e.className + " ")
				},
				s = function(e, t) {
					r(e, t) || (e.className += " " + t)
				},
				l = function(e, t) {
					var n = " " + e.className.replace(/[\t\r\n]/g, " ") + " ";
					if (r(e, t)) {
						for (; n.indexOf(" " + t + " ") >= 0;) n = n.replace(" " + t + " ", " ");
						e.className = n.replace(/^\s+|\s+$/g, "")
					}
				},
				i = function(e) {
					var n = t.createElement("div");
					return n.appendChild(t.createTextNode(e)), n.innerHTML
				},
				u = function(e) {
					e.style.opacity = "", e.style.display = "block"
				},
				c = function(e) {
					if (e && !e.length) return u(e);
					for (var t = 0; t < e.length; ++t) u(e[t])
				},
				d = function(e) {
					e.style.opacity = "", e.style.display = "none"
				},
				f = function(e) {
					if (e && !e.length) return d(e);
					for (var t = 0; t < e.length; ++t) d(e[t])
				},
				p = function(e, t) {
					for (var n = t.parentNode; null !== n;) {
						if (n === e) return !0;
						n = n.parentNode
					}
					return !1
				},
				m = function(e) {
					e.style.left = "-9999px", e.style.display = "block";
					var t, n = e.clientHeight;
					return t = "undefined" != typeof getComputedStyle ? parseInt(getComputedStyle(e).getPropertyValue("padding-top"), 10) : parseInt(e.currentStyle.padding), e.style.left = "", e.style.display = "none", "-" + parseInt((n + t) / 2) + "px"
				},
				v = function(e, t) {
					if (+e.style.opacity < 1) {
						t = t || 16, e.style.opacity = 0, e.style.display = "block";
						var n = +new Date,
							o = function a() {
								e.style.opacity = +e.style.opacity + (new Date - n) / 100, n = +new Date, +e.style.opacity < 1 && setTimeout(a, t)
							};
						o()
					}
					e.style.display = "block"
				},
				y = function(e, t) {
					t = t || 16, e.style.opacity = 1;
					var n = +new Date,
						o = function a() {
							e.style.opacity = +e.style.opacity - (new Date - n) / 100, n = +new Date, +e.style.opacity > 0 ? setTimeout(a, t) : e.style.display = "none"
						};
					o()
				},
				b = function(n) {
					if ("function" == typeof MouseEvent) {
						var o = new MouseEvent("click", {
							view: e,
							bubbles: !1,
							cancelable: !0
						});
						n.dispatchEvent(o)
					} else if (t.createEvent) {
						var a = t.createEvent("MouseEvents");
						a.initEvent("click", !1, !1), n.dispatchEvent(a)
					} else t.createEventObject ? n.fireEvent("onclick") : "function" == typeof n.onclick && n.onclick()
				},
				h = function(t) {
					"function" == typeof t.stopPropagation ? (t.stopPropagation(), t.preventDefault()) : e.event && e.event.hasOwnProperty("cancelBubble") && (e.event.cancelBubble = !0)
				};
			a.hasClass = r, a.addClass = s, a.removeClass = l, a.escapeHtml = i, a._show = u, a.show = c, a._hide = d, a.hide = f, a.isDescendant = p, a.getTopMargin = m, a.fadeIn = v, a.fadeOut = y, a.fireClick = b, a.stopEventPropagation = h
		}, {}],
		5: [function(t, o, a) {
			Object.defineProperty(a, "__esModule", {
				value: !0
			});
			var r = t("./handle-dom"),
				s = t("./handle-swal-dom"),
				l = function(t, o, a) {
					var l = t || e.event,
						i = l.keyCode || l.which,
						u = a.querySelector("button.confirm"),
						c = a.querySelector("button.cancel"),
						d = a.querySelectorAll("button[tabindex]");
					if (-1 !== [9, 13, 32, 27].indexOf(i)) {
						for (var f = l.target || l.srcElement, p = -1, m = 0; m < d.length; m++) if (f === d[m]) {
							p = m;
							break
						}
						9 === i ? (f = -1 === p ? u : p === d.length - 1 ? d[0] : d[p + 1], (0, r.stopEventPropagation)(l), f.focus(), o.confirmButtonColor && (0, s.setFocusStyle)(f, o.confirmButtonColor)) : 13 === i ? ("INPUT" === f.tagName && (f = u, u.focus()), f = -1 === p ? u : n) : 27 === i && o.allowEscapeKey === !0 ? (f = c, (0, r.fireClick)(f, l)) : f = n
					}
				};
			a["default"] = l, o.exports = a["default"]
		}, {
			"./handle-dom": 4,
			"./handle-swal-dom": 6
		}],
		6: [function(n, o, a) {
			function r(e) {
				return e && e.__esModule ? e : {
					"default": e
				}
			}
			Object.defineProperty(a, "__esModule", {
				value: !0
			});
			var s = n("./utils"),
				l = n("./handle-dom"),
				i = n("./default-params"),
				u = r(i),
				c = n("./injected-html"),
				d = r(c),
				f = ".sweet-alert",
				p = ".sweet-overlay",
				m = function() {
					var e = t.createElement("div");
					for (e.innerHTML = d["default"]; e.firstChild;) t.body.appendChild(e.firstChild)
				},
				v = function x() {
					var e = t.querySelector(f);
					return e || (m(), e = x()), e
				},
				y = function() {
					var e = v();
					return e ? e.querySelector("input") : void 0
				},
				b = function() {
					return t.querySelector(p)
				},
				h = function(e, t) {
					var n = (0, s.hexToRgb)(t);
					e.style.boxShadow = "0 0 2px rgba(" + n + ", 0.8), inset 0 0 0 1px rgba(0, 0, 0, 0.05)"
				},
				g = function(n) {
					var o = v();
					(0, l.fadeIn)(b(), 10), (0, l.show)(o), (0, l.addClass)(o, "showSweetAlert"), (0, l.removeClass)(o, "hideSweetAlert"), e.previousActiveElement = t.activeElement;
					var a = o.querySelector("button.confirm");
					a.focus(), setTimeout(function() {
						(0, l.addClass)(o, "visible")
					}, 500);
					var r = o.getAttribute("data-timer");
					if ("null" !== r && "" !== r) {
						var s = n;
						o.timeout = setTimeout(function() {
							var e = (s || null) && "true" === o.getAttribute("data-has-done-function");
							e ? s(null) : sweetAlert.close()
						}, r)
					}
				},
				w = function() {
					var e = v(),
						t = y();
					(0, l.removeClass)(e, "show-input"), t.value = u["default"].inputValue, t.setAttribute("type", u["default"].inputType), t.setAttribute("placeholder", u["default"].inputPlaceholder), C()
				},
				C = function(e) {
					if (e && 13 === e.keyCode) return !1;
					var t = v(),
						n = t.querySelector(".sa-input-error");
					(0, l.removeClass)(n, "show");
					var o = t.querySelector(".sa-error-container");
					(0, l.removeClass)(o, "show")
				},
				S = function() {
					var e = v();
					e.style.marginTop = (0, l.getTopMargin)(v())
				};
			a.sweetAlertInitialize = m, a.getModal = v, a.getOverlay = b, a.getInput = y, a.setFocusStyle = h, a.openModal = g, a.resetInput = w, a.resetInputError = C, a.fixVerticalPosition = S
		}, {
			"./default-params": 2,
			"./handle-dom": 4,
			"./injected-html": 7,
			"./utils": 9
		}],
		7: [function(e, t, n) {
			Object.defineProperty(n, "__esModule", {
				value: !0
			});
			var o = '<div class="sweet-overlay" tabIndex="-1"></div><div class="sweet-alert"><div class="sa-icon sa-error">\n      <span class="sa-x-mark">\n        <span class="sa-line sa-left"></span>\n        <span class="sa-line sa-right"></span>\n      </span>\n    </div><div class="sa-icon sa-warning">\n      <span class="sa-body"></span>\n      <span class="sa-dot"></span>\n    </div><div class="sa-icon sa-info"></div><div class="sa-icon sa-success">\n      <span class="sa-line sa-tip"></span>\n      <span class="sa-line sa-long"></span>\n\n      <div class="sa-placeholder"></div>\n      <div class="sa-fix"></div>\n    </div><div class="sa-icon sa-custom"></div><h2>Title</h2>\n    <p>Text</p>\n    <fieldset>\n      <input type="text" tabIndex="3" />\n      <div class="sa-input-error"></div>\n    </fieldset><div class="sa-error-container">\n      <div class="icon">!</div>\n      <p>Not valid!</p>\n    </div><div class="sa-button-container">\n      <button class="cancel" tabIndex="2">Cancel</button>\n      <div class="sa-confirm-button-container">\n        <button class="confirm" tabIndex="1">OK</button><div class="la-ball-fall">\n          <div></div>\n          <div></div>\n          <div></div>\n        </div>\n      </div>\n    </div></div>';
			n["default"] = o, t.exports = n["default"]
		}, {}],
		8: [function(e, t, o) {
			Object.defineProperty(o, "__esModule", {
				value: !0
			});
			var a = e("./utils"),
				r = e("./handle-swal-dom"),
				s = e("./handle-dom"),
				l = ["error", "warning", "info", "success", "input", "prompt"],
				i = function(e) {
					var t = (0, r.getModal)(),
						o = t.querySelector("h2"),
						i = t.querySelector("p"),
						u = t.querySelector("button.cancel"),
						c = t.querySelector("button.confirm");
					if (o.innerHTML = e.html ? e.title : (0, s.escapeHtml)(e.title).split("\n").join("<br>"), i.innerHTML = e.html ? e.text : (0, s.escapeHtml)(e.text || "").split("\n").join("<br>"), e.text && (0, s.show)(i), e.customClass)(0, s.addClass)(t, e.customClass), t.setAttribute("data-custom-class", e.customClass);
					else {
						var d = t.getAttribute("data-custom-class");
						(0, s.removeClass)(t, d), t.setAttribute("data-custom-class", "")
					}
					if ((0, s.hide)(t.querySelectorAll(".sa-icon")), e.type && !(0, a.isIE8)()) {
						var f = function() {
								for (var o = !1, a = 0; a < l.length; a++) if (e.type === l[a]) {
									o = !0;
									break
								}
								if (!o) return logStr("Unknown alert type: " + e.type), {
									v: !1
								};
								var i = ["success", "error", "warning", "info"],
									u = n; - 1 !== i.indexOf(e.type) && (u = t.querySelector(".sa-icon.sa-" + e.type), (0, s.show)(u));
								var c = (0, r.getInput)();
								switch (e.type) {
								case "success":
									(0, s.addClass)(u, "animate"), (0, s.addClass)(u.querySelector(".sa-tip"), "animateSuccessTip"), (0, s.addClass)(u.querySelector(".sa-long"), "animateSuccessLong");
									break;
								case "error":
									(0, s.addClass)(u, "animateErrorIcon"), (0, s.addClass)(u.querySelector(".sa-x-mark"), "animateXMark");
									break;
								case "warning":
									(0, s.addClass)(u, "pulseWarning"), (0, s.addClass)(u.querySelector(".sa-body"), "pulseWarningIns"), (0, s.addClass)(u.querySelector(".sa-dot"), "pulseWarningIns");
									break;
								case "input":
								case "prompt":
									c.setAttribute("type", e.inputType), c.value = e.inputValue, c.setAttribute("placeholder", e.inputPlaceholder), (0, s.addClass)(t, "show-input"), setTimeout(function() {
										c.focus(), c.addEventListener("keyup", swal.resetInputError)
									}, 400)
								}
							}();
						if ("object" == typeof f) return f.v
					}
					if (e.imageUrl) {
						var p = t.querySelector(".sa-icon.sa-custom");
						p.style.backgroundImage = "url(" + e.imageUrl + ")", (0, s.show)(p);
						var m = 80,
							v = 80;
						if (e.imageSize) {
							var y = e.imageSize.toString().split("x"),
								b = y[0],
								h = y[1];
							b && h ? (m = b, v = h) : logStr("Parameter imageSize expects value with format WIDTHxHEIGHT, got " + e.imageSize)
						}
						p.setAttribute("style", p.getAttribute("style") + "width:" + m + "px; height:" + v + "px")
					}
					t.setAttribute("data-has-cancel-button", e.showCancelButton), e.showCancelButton ? u.style.display = "inline-block" : (0, s.hide)(u), t.setAttribute("data-has-confirm-button", e.showConfirmButton), e.showConfirmButton ? c.style.display = "inline-block" : (0, s.hide)(c), e.cancelButtonText && (u.innerHTML = (0, s.escapeHtml)(e.cancelButtonText)), e.confirmButtonText && (c.innerHTML = (0, s.escapeHtml)(e.confirmButtonText)), e.confirmButtonColor && (c.style.backgroundColor = e.confirmButtonColor, c.style.borderLeftColor = e.confirmLoadingButtonColor, c.style.borderRightColor = e.confirmLoadingButtonColor, (0, r.setFocusStyle)(c, e.confirmButtonColor)), t.setAttribute("data-allow-outside-click", e.allowOutsideClick);
					var g = !! e.doneFunction;
					t.setAttribute("data-has-done-function", g), e.animation ? "string" == typeof e.animation ? t.setAttribute("data-animation", e.animation) : t.setAttribute("data-animation", "pop") : t.setAttribute("data-animation", "none"), t.setAttribute("data-timer", e.timer)
				};
			o["default"] = i, t.exports = o["default"]
		}, {
			"./handle-dom": 4,
			"./handle-swal-dom": 6,
			"./utils": 9
		}],
		9: [function(t, n, o) {
			Object.defineProperty(o, "__esModule", {
				value: !0
			});
			var a = function(e, t) {
					for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
					return e
				},
				r = function(e) {
					var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
					return t ? parseInt(t[1], 16) + ", " + parseInt(t[2], 16) + ", " + parseInt(t[3], 16) : null
				},
				s = function() {
					return e.attachEvent && !e.addEventListener
				},
				l = function(t) {
					"undefined" != typeof e && e.console && e.console.log("SweetAlert: " + t)
				},
				i = function(e, t) {
					e = String(e).replace(/[^0-9a-f]/gi, ""), e.length < 6 && (e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2]), t = t || 0;
					var n, o, a = "#";
					for (o = 0; 3 > o; o++) n = parseInt(e.substr(2 * o, 2), 16), n = Math.round(Math.min(Math.max(0, n + n * t), 255)).toString(16), a += ("00" + n).substr(n.length);
					return a
				};
			o.extend = a, o.hexToRgb = r, o.isIE8 = s, o.logStr = l, o.colorLuminance = i
		}, {}]
	}, {}, [1]), "function" == typeof define && define.amd ? define(function() {
		return sweetAlert
	}) : "undefined" != typeof module && module.exports && (module.exports = sweetAlert)
}(window, document);

function kuiError(text, title, btn, callback) {
	swal({
		title : title ? typeof(title) == 'function' ? title() : title : '',
		text : text ? typeof(text) == 'function' ? text() : text : '',
		type : 'error',
		confirmButtonText : btn
	}, callback);
}

/*---------- 以下是kui脚本库 ----------*/

//需要进行初始化操作的UI样式名称
var KUI_INIT_CLASSES = ['button','label.checkbox','kui-autosearch-input','kui-loading','kui-topnav','kui-sidenav','kui-table','kui-table-box','kui-modal','kui-sidebar-modal','kui-modal-form','kui-layout'];

//UI样式名称对应的初始化操作器
var KUI_CLASS_INIT_HANDLERS = {
	'button' : initElementKuiButton,
	'label.checkbox' : initClassKuiLabelCheckbox,
	'kui-autosearch-input' : initClassKuiAutosearchInput,
	'kui-loading' : initClassKuiLoading,
	'kui-topnav' : initClassKuiTopnav,
	'kui-sidenav' : initClassKuiSidenav,
	'kui-table' : initClassKuiTable,
	'kui-table-box' : initClassKuiTableBox,
	'kui-modal' : initClassKuiModal,
	'kui-sidebar-modal' : initClassKuiSidebarModal,
	'kui-modal-form' : initClassKuiModalForm,
	'kui-layout' : initClassKuiLayout
};

//UI对象对应的系统生成data-bind值计数器
var KUI_OBJ_SYSBIND_COUNTER = {
	'button' : 0,
	'label.checkbox' : 0,
	'kui-autosearch-input' : 0,
	'kui-table' : 0,
	'kui-layout' : 0
};

//UI对象查找表，由id查找表和data-bind查找表组成
var KUI_OBJ_LOOKUP = {id:{}, bind:{}};

//根据id或data-bind查找UI对象，先查id再查data-bind
function kui(value) {
	if(typeof(value) != 'string') {
		return null;
	}

	var obj = KUI_OBJ_LOOKUP.id[value];
	if(!obj) {
		obj = KUI_OBJ_LOOKUP.bind[value];
	}

	return typeof(obj) == 'undefined' ? null : obj;
}

//事件上下文对象
function KuiEventContext() {
	var _this = this;

	var _eventListenerLookup = {};
	var _objEventBinds = {};

	//注册事件监听器
	this.register = function(event, listener, obj) {
		if(event && typeof(listener) == 'function') {
			var list = _eventListenerLookup[event];
			if(list) {
				list.push(listener);
			}else {
				list = [listener];
				_eventListenerLookup[event] = list;
			}
			if(obj && typeof(obj) == 'object') {
				list = _objEventBinds[obj];
				if(list) {
					list.push([event, listener]);
				}else {
					list = [[event, listener]];
					_objEventBinds[obj] = list;
				}
			}
		}
	};

	//注销事件监听器
	this.unregister = function(event, listener) {
		if(event && typeof(listener) == 'function') {
			var list = _eventListenerLookup[event];
			if(list && list.length > 0) {
				for(var i = list.length - 1; i >= 0; i--) {
					if(listener == list[i]) {
						list.splice(i, 1);
					}
				}
			}
		}
	};

	//注销指定对象上的所有事件监听器
	this.unbind = function(obj) {
		if(obj) {
			var list = _objEventBinds[obj];
			if(list && list.length > 0) {
				for(var i = 0; i < list.length; i++) {
					_this.unregister(list[i][0], list[i][1]);
				}
			}
			delete _objEventBinds[obj];
		}
	};

	//广播事件
	this.send = function(event, data) {
		if(event) {
			var list = _eventListenerLookup[event];
			if(list && list.length > 0) {
				for(var i = 0; i < list.length; i++) {
					list[i](data);
				}
			}
		}
	};
}

//button元素对象
function KuiButton(inst) {
	var _this = this;
	var _inst = inst;
	
	var _status = 'enabled';
	var _data = null;
	
	/**
	 * 公共方法:
	 * 	rename : 重命名
	 * 	reset : 重置到默认
	 */
	var _provider = null;
	
	(function() {
		var bind = _inst.data('bind');
		if(typeof(bind) == 'undefined' || bind == '') {
			_inst.data('bind', 'sys-kui-button-' + ++KUI_OBJ_SYSBIND_COUNTER['button']);
		}
		
		if(_inst.hasClass('select-modal')) {
			_provider = new (function() {
				var _name = $('>span:nth-child(1)>span:nth-child(1)', _inst);
				var _default = _name.html();
				
				this.rename = function(value) {
					_name.html(typeof(value) == 'function' ? value() : value);
				};
				
				this.reset = function() {
					_name.html(_default);
				};
			})();
		}else {
			_provider = new (function() {
				var _default = _inst.html();
				
				this.rename = function(value) {
					_inst.html(typeof(value) == 'function' ? value() : value);
				};
				
				this.reset = function() {
					_inst.html(_default);
				};
			})();
		}
	})();
	
	this.id = function() {
		return _inst.attr('id');
	};

	this.bind = function() {
		return _inst.data('bind');
	};
	
	this.enabled = function() {
		_inst.removeClass('disabled');
		_status = 'enabled';
	};
	
	this.disabled = function() {
		_inst.addClass('disabled');
		_status = 'disabled';
	};
	
	this.isEnabled = function() {
		return _status == 'enabled';
	};
	
	this.isDisabled = function() {
		return _status == 'disabled';
	};
	
	this.getData = function(format) {
		return format ? format(_data) : _data;
	};
	
	this.setData = function(data) {
		_data = data;
	};
	
	this.rename = function(value) {
		if(_provider) {
			_provider.rename(value);
		}
	};
	
	this.reset = function() {
		_data = null;
		if(_provider) {
			_provider.reset();
		}
	};
}

//Label下的Checkbox组件对象
function KuiLabelCheckbox(inst) {
	var _this = this;
	var _inst = inst;

	var _value = ''; //绑定值
	var _checked = false; //是否已选中

	var _options = {
		onChange : null //当选中状态发生改变时的回调函数
	};

	(function() {
		var bind = _inst.data('bind');
		if(typeof(bind) == 'undefined' || bind == '') {
			_inst.data('bind', 'sys-label-checkbox-' + ++KUI_OBJ_SYSBIND_COUNTER['label.checkbox']);
		}
		
		_value = _inst.data('value');
		if(typeof(_value) == 'undefined') {
			_value = '';
		}
		
		if(_value != '') {
			var valueType = _inst.data('value-type');
			if(valueType) {
				switch(valueType) {
					case 'object':
						_value = eval('(' + _value + ')');
						break;
				}
			}
		}

		if(_inst.hasClass('active')) {
			_checked = true;
		}
		
		var onChange = _inst.data('on-change');
		if(onChange) {
			onChange = eval(onChange);
			if(typeof(onChange) == 'function') {
				_options.onChange = onChange;
			}
		}
	})();

	this.id = function() {
		return _inst.attr('id');
	};

	this.bind = function() {
		return _inst.data('bind');
	};
	
	this.getValue = function() {
		return _value;
	};
	
	this.setValue = function(value) {
		_value = value ? typeof(value) == 'function' ? value() : value : '';
	};

	//获取当前是否已选中
	this.isChecked = function() {
		return _checked;
	};

	//设置选中状态
	this.setChecked = function(value, src) {
		if(_checked != value) {
			_checked = value;
			if(_checked) {
				_inst.addClass('active');
			}else {
				_inst.removeClass('active');
			}
			if(_options.onChange) {
				_options.onChange(_this, src);
			}
		}
	};

	this.getOptions = function() {
		return _options;
	};

	this.setOptions = function(options) {
		if(typeof(options) == 'object') {
			if(typeof(options.onChange) == 'function') {
				_options.onChange = options.onChange;
			}
		}
	};
	
	this.show = function() {
		_inst.show();
	};

	this.hide = function() {
		_inst.hide();
	};

	_inst.click(function() {
		if(_checked) {
			_this.setChecked(false, 'user');
		}else {
			_this.setChecked(true, 'user');
		}
	});
}

//自动搜索框组件对象
function KuiAutosearchInput(inst) {
	var _this = this;
	var _inst = inst;
	var _input = $('>input:nth-child(1)', _inst);
	
	var _defaultValue = _input.val();
	var _lastValue = '';
	
	var _options = {
		onChange : null //当搜索框内容发生改变时的回调函数
	};

	(function() {
		var bind = _inst.data('bind');
		if(typeof(bind) == 'undefined' || bind == '') {
			_inst.data('bind', 'sys-kui-autosearch-input-' + ++KUI_OBJ_SYSBIND_COUNTER['kui-autosearch-input']);
		}
	})();

	this.id = function() {
		return _inst.attr('id');
	};

	this.bind = function() {
		return _inst.data('bind');
	};
	
	this.getValue = function(format) {
		return format ? format(_input.val()) : _input.val();
	};
	
	this.setValue = function(value) {
		_input.val(value);
	};
	
	this.getOptions = function() {
		return _options;
	};

	this.setOptions = function(options) {
		if(typeof(options) == 'object') {
			if(typeof(options.onChange) == 'function') {
				_options.onChange = options.onChange;
			}
		}
	};
	
	this.reset = function() {
		_input.val(_defaultValue);
	};
	
	this.onInputChange = function() {
		var value = _input.val();
		if(value != _lastValue) {
			_lastValue = value;
			if(_options.onChange) {
				_options.onChange(value, _this);
			}
		}
	};
	
	if(_input) {
		_input.keyup(function() {
			_this.onInputChange();
		});
		_input.change(function() {
			_this.onInputChange();
		});
	}
}

//加载动画组件对象
function KuiLoading(inst) {
	var _this = this;
	var _inst = inst;
	
	(function() {
		var size = _inst.data('size');
		if(size) {
			size = parseInt(size);
			if(!isNaN(size) && size > 0) {
				$('>div', _inst).css({
					width : size + 'px',
					height: size + 'px'
				});
			}
		}
	})();
	
	this.id = function() {
		return _inst.attr('id');
	};

	this.bind = function() {
		return _inst.data('bind');
	};
	
	this.show = function(callback) {
		_inst.show(callback);
	};
	
	this.hide = function(callback) {
		_inst.hide(callback);
	};
}

//顶部导航对象
function KuiTopnav(inst) {
	var _this = this;
	var _inst = inst;

	var _context = {activeMenu:null};

	var _menuList = new KuiTopnavMenuList(_context, $($('>div:nth-child(1)>ul', _inst)[0]));

	this.id = function() {
		return _inst.attr('id');
	};

	this.bind = function() {
		return _inst.data('bind');
	};

	//获得一级菜单数量
	this.getMenuCount = function() {
		return _menuList.getMenuCount();
	};

	//激活指定一级菜单，value可以是索引位、id或data-bind
	this.enabledMenu = function(value) {
		_menuList.enabledMenu(value);
	};
}

//顶部导航菜单列表
function KuiTopnavMenuList(context, inst) {
	var _this = this;
	var _context = context;
	var _inst = inst;

	var _menuItems = [];
	var _menuItemLookup = {id:{}, bind:{}};

	//获得一级菜单数量
	this.getMenuCount = function() {
		return _menuItems.length;
	};

	//激活指定一级菜单，value可以是索引位、id或data-bind
	this.enabledMenu = function(value) {
		if(typeof(value) == 'number') {
			value = parseInt(value);
			if(value >= 0 && value < _menuItems.length) {
				_menuItems[value].enabled();
			}
		}else if(typeof(value) == 'string') {
			var item = _menuItemLookup.id[value];
			if(!item) {
				item = _menuItemLookup.bind[value];
			}

			if(item) {
				item.enabled();
			}
		}
	};

	$('>li', _inst).each(function() {
		var item = new KuiTopnavMenuItem(_context, $(this));
		_menuItems.push(item);

		var id = item.id();
		if(typeof(id) != 'undefined') {
			_menuItemLookup.id[id] = item;
		}

		var bind = item.bind();
		if(typeof(bind) != 'undefined') {
			_menuItemLookup.bind[bind] = item;
		}
	});
}

//顶部导航菜单项
function KuiTopnavMenuItem(context, inst) {
	var _this = this;
	var _context = context;
	var _inst = inst;

	var _link = $($('>a:nth-child(1)', _inst)[0]);
	var _nameInst = $($('>a>span:nth-child(1)', _inst)[0]);

	var _dropdown = null;

	this.id = function() {
		return _inst.attr('id');
	};

	this.bind = function() {
		return _inst.data('bind');
	};

	//获得菜单名称
	this.getName = function() {
		return _nameInst.html();
	};

	//设置菜单名称
	this.setName = function(value) {
		_nameInst.html(value);
	};

	//激活菜单
	this.enabled = function() {
		_link.addClass('active');
	};

	//关闭二级菜单
	this.closeDropdown = function() {
		if(_dropdown) {
			_dropdown.close();
		}
	};

	(function() {
		var list = $('>ul', _inst);
		if(list.length > 0) {
			_dropdown = new KuiTopnavMenuItemDropdown($(list[0]));

			_link.attr('href', 'javascript:;');
			_link.unbind();
			_link.click(function(e) {
				e.stopPropagation();
				if(_dropdown.toggle()) {
					if(_context.activeMenu) {
						_context.activeMenu.closeDropdown();
					}
					_context.activeMenu = _this;
				}else {
					_context.activeMenu = null;
				}
			});

			$(document).click(function() {
				_dropdown.close();
				_context.activeMenu = null;
			});
		}
	})();
}

//顶部导航菜单项二级菜单
function KuiTopnavMenuItemDropdown(inst) {
	var _this = this;
	var _inst = inst;

	var _status = 'close';

	this.open = function() {
		_inst.show();
		_status = 'open';
	};

	this.close = function() {
		_inst.hide();
		_status = 'close';
	};

	this.toggle = function() {
		if(_status == 'close') {
			_this.open();
			return true;
		}else {
			_this.close();
			return false;
		}
	};

	_inst.click(function(e) {
		e.stopPropagation();
	});
}

//侧边导航栏对象
function KuiSidenav(inst) {
	var _this = this;
	var _inst = inst;

	this.id = function() {
		return _inst.attr('id');
	};

	this.bind = function() {
		return _inst.data('bind');
	};

	(function() {
		var index = 0;
		$('>li', _inst).each(function() {
			var menu = new KuiSidenavMenu($(this));
			index++;
		});
	})();
}

//侧边导航栏一级菜单对象
function KuiSidenavMenu(inst) {
	var _this = this;
	var _inst = inst;
	var _link = $(_inst.children().get(0));

	var _dropdown = null;

	(function() {
		var t = _inst.children().get(1);
		if(t) {
			t = $(t);
			if(t.is('ul')) {
				_dropdown = new KuiSidenavMenuDropdown(t);
				_link.attr('href', 'javascript:;');
				_link.click(function() {
					if(_dropdown.toggle()) {
						_link.addClass('open');
					}else {
						_link.removeClass('open');
					}
				});
			}
		}
	})();
}

//侧边导航栏一级菜单下拉框对象
function KuiSidenavMenuDropdown(inst) {
	var _this = this;
	var _inst = inst;

	var _status = 'close';

	(function() {
		var index = 0;
		$('>li', _inst).each(function() {
			var menu = new KuiSidenavMenuDropdownMenu($(this));
			index++;
		});
	})();

	this.toggle = function() {
		if(_status == 'close') {
			_inst.slideDown();
			_status = 'open';
			return true;
		}else {
			_inst.slideUp();
			_status = 'close';
			return false;
		}
	};
}

//侧边导航栏一级菜单下拉框菜单对象
function KuiSidenavMenuDropdownMenu(inst) {
	var _this = this;
	var _inst = inst;
}

//表格对象
function KuiTable(inst) {
	var _this = this;
	var _inst = inst;

	var _options = {
		enabledSortColumn : true, //是否激活排序功能
		sortMultiColumn : false, //是否可以多列同时排序
		onSortColumns : null //点击表头排序时的回调函数
	};

	(function() {
		var bind = _inst.data('bind');
		if(typeof(bind) == 'undefined' || bind == '') {
			_inst.data('bind', 'sys-kui-table-' + ++KUI_OBJ_SYSBIND_COUNTER['kui-table']);
		}
		
		var enabledSortColumn = _inst.data('enabledsortcolumn');
		if(typeof(enabledSortColumn) == 'boolean') {
			_options.enabledSortColumn = enabledSortColumn;
		}

		var sortMultiColumn = _inst.data('sortmulticolumn');
		if(typeof(sortMultiColumn) == 'boolean') {
			_options.sortMultiColumn = sortMultiColumn;
		}
	})();

	var _context = {
		options : _options,
		event : new KuiEventContext(),
		table : _this,
		columnCount : 0,
		rowCount : 0,
		selectRows : {
			enabled : false, //是否激活行选择功能
			selectMulti : false, //是否可多选行
			rowFirstColumns : [] //当前已选择的行对象的第一列（即带有checkbox的列）
		}
	};

	var _head = new KuiTableHead(_context, $($('thead', _inst)[0]));
	var _body = new KuiTableBody(_context, $($('tbody', _inst)[0]));

	this.id = function() {
		return _inst.attr('id');
	};

	this.bind = function() {
		return _inst.data('bind');
	};

	this.getOptions = function() {
		return _options;
	};

	this.setOptions = function(options) {
		if(typeof(options) == 'object') {
			if(typeof(options.enabledSortColumn) == 'boolean') {
				_options.enabledSortColumn = options.enabledSortColumn;
			}

			if(typeof(options.sortMultiColumn) == 'boolean') {
				_options.sortMultiColumn = options.sortMultiColumn;
			}

			if(typeof(options.onSortColumns) == 'function') {
				_options.onSortColumns = options.onSortColumns;
			}
		}
	};

	//显示指定列
	this.showColumn = function(index) {
		_head.showColumn(index);
		_body.showColumn(index);
	};

	//隐藏指定列
	this.hideColumn = function(index) {
		_head.hideColumn(index);
		_body.hideColumn(index);
	};

	//激活列排序功能
	this.enabledSortColumn = function() {
		_options.enabledSortColumn = true;
	};

	//禁用列排序功能
	this.disabledSortColumn = function() {
		_options.enabledSortColumn = false;
	};

	//更新表格数据
	this.updateData = function(data) {
		_body.updateData(data);
	};

	//清空表格数据
	this.clearData = function() {
		_body.clearData();
	};
	
	//获得已选中的行对象
	this.getSelectRows = function() {
		if(_context.selectRows.enabled) {
			if(_context.selectRows.selectMulti) {
				var rows = [];
				for(var i = 0; i < _context.selectRows.rowFirstColumns.length; i++) {
					rows.push(_context.selectRows.rowFirstColumns[i].getRow());
				}
				return rows;
			}else {
				if(_context.selectRows.rowFirstColumns.length > 0) {
					return _context.selectRows.rowFirstColumns[0].getRow();
				}
				return null;
			}
		}
		return null;
	};
}

//表格头对象
function KuiTableHead(context, inst) {
	var _this = this;
	var _context = context;
	var _inst = inst;

	_context.head = _this;

	var _headRow = null;
	var _actionRow = null;

	(function() {
		var list = $('tr', _inst);
		_headRow = new KuiTableHeadRow(_context, $(list[0]));
		if(list.length > 1) {
			_actionRow = new KuiTableHeadActionRow(_context, $(list[1]));
		}
	})();
	
	//获得所有列对象
	this.getColumns = function() {
		return _headRow.getColumns();
	};

	//显示指定列
	this.showColumn = function(index) {
		_headRow.showColumn(index);
	};

	//隐藏指定列
	this.hideColumn = function(index) {
		_headRow.hideColumn(index);
	};

	this.update = function() {
		if(_actionRow) {
			if(_context.selectRows.rowFirstColumns.length == 0) {
				_actionRow.hide();
				_headRow.show();
			}else {
				_headRow.hide();
				_actionRow.show();
			}
		}
	};

	_context.event.register('row.select', _this.update);
	_context.event.register('rows.select.all', _this.update);

	_context.event.register('row.unselect', _this.update);
	_context.event.register('rows.unselect.all', _this.update);
}

//表格头行对象
function KuiTableHeadRow(context, inst) {
	var _this = this;
	var _context = context;
	var _inst = inst;

	this.show = function() {
		_inst.show();
	};

	this.hide = function() {
		_inst.hide();
	};

	var _columns = [];

	(function() {
		var index = 0;
		$('th', _inst).each(function() {
			var col = new KuiTableHeadColumn(_context, _this, index, $(this));
			_columns.push(col);
			index++;
		});
	})();

	_context.columnCount = _columns.length;
	
	//获得所有列对象
	this.getColumns = function() {
		return _columns;
	};

	//显示指定列
	this.showColumn = function(index) {
		if(index >= 0 && index < _columns.length) {
			_columns[index].show();
		}
	};

	//隐藏指定列
	this.hideColumn = function(index) {
		if(index >= 0 && index < _columns.length) {
			_columns[index].hide();
		}
	};

	var _sortColumns = [];

	this.addSortColumn = function(column) {
		if(column.getCaseType() == 1) {
			if(_context.options.sortMultiColumn) {
				_sortColumns.push(column);
			}else {
				for(var i = 0; i < _sortColumns.length; i++) {
					_sortColumns[i].cancelSort(false);
				}
				_sortColumns = [column];
			}
			_this.notifySortColumns();
		}
	};

	this.updateSortColumn = function(column) {
		if(column.getCaseType() == 1) {
			_this.notifySortColumns();
		}
	};

	this.removeSortColumn = function(column) {
		if(column.getCaseType() == 1) {
			for(var i = 0; i < _sortColumns.length; i++) {
				if(column.getIndex() == _sortColumns[i].getIndex()) {
					_sortColumns.splice(i, 1);
					break;
				}
			}
			_this.notifySortColumns();
		}
	};

	this.notifySortColumns = function() {
		if(_context.options.onSortColumns) {
			var ret = _context.options.onSortColumns(_sortColumns);
			if(typeof(ret) == 'boolean') {
				_context.options.enabledSortColumn = ret;
			}
		}
	};
}

//表格头列对象
function KuiTableHeadColumn(context, row, index, inst) {
	var _this = this;
	var _context = context;
	var _row = row;
	var _index = index;
	var _inst = inst;
	
	var _fieldName = _inst.data('field-name');
	var _fieldDefault = _inst.data('field-default');
	var _fieldFormat = _inst.data('field-format');

	var _case = $(_inst.children().get(0));
	var _caseType = -1; //列类型，0=默认(只有文字)，1=高级(有排序)，2=checkbox选择列，其它值无效

	var _sortMode = ''; //排序模式，''=没有排序，desc=降序，asc=升序
	var _sortName = '';

	var _checkbox = null; //如果_caseType=2，并且可多选行，则关联checkbox对象

	//获得列所在索引位
	this.getIndex = function() {
		return _index;
	};
	
	//获得列绑定的字段名称
	this.getFieldName = function() {
		return _fieldName ? _fieldName : '';
	};
	
	//获得列绑定的字段默认值
	this.getFieldDefault = function() {
		return _fieldDefault ? _fieldDefault : '';
	};
	
	this.getFieldFormat = function() {
		return _fieldFormat ? eval(_fieldFormat) : null;
	};

	//显示列
	this.show = function() {
		_inst.show();
	};

	//隐藏列
	this.hide = function() {
		_inst.hide();
	};

	//获得列类型
	this.getCaseType = function() {
		return _caseType;
	};
	
	//判断当前列是否是字段列
	this.isFieldColumn = function() {
		return _caseType != 2;
	};

	if(_inst.hasClass('checkbox') && _index == 0) {
		_caseType = 2;
	}else if(_case.is('span')) {
		_caseType = 0;
	}else if(_case.is('div')) {
		_caseType = 1;
	}

	if(_caseType < 0 || _caseType > 2) {
		return;
	}

	if(_caseType == 1) {
		_sortName = _inst.data('sort-name');

		this.getSortMode = function() {
			return _sortMode;
		};

		this.getSortName = function() {
			return _sortName;
		};

		this.sortDesc = function() {
			_sortMode = 'desc';
			_case.removeClass('sort-asc');
			_case.addClass('sort-desc');
			_row.addSortColumn(_this);
		};

		this.sortAsc = function() {
			_sortMode = 'asc';
			_case.removeClass('sort-desc');
			_case.addClass('sort-asc');
			_row.updateSortColumn(_this);
		};

		this.cancelSort = function(needNotify) {
			_sortMode = '';
			_case.removeClass('sort-desc');
			_case.removeClass('sort-asc');
			if(needNotify) {
				_row.removeSortColumn(_this);
			}
		};

		_case.unbind();
		_case.click(function() {
			if(_context.options.enabledSortColumn) {
				switch(_sortMode) {
					case '':
						_this.sortDesc();
						break;
					case 'desc':
						_this.sortAsc();
						break;
					case 'asc':
						_this.cancelSort(true);
						break;
				}
			}
		});
	}else if(_caseType == 2) {
		_context.selectRows.enabled = true;

		if(_case.is('label') && _case.hasClass('checkbox')) {
			_context.selectRows.selectMulti = true;

			_checkbox = kui(_case.data('bind'));
			_checkbox.setOptions({
				onChange : function(self, src) {
					if(src == 'user') {
						_context.event.send(_checkbox.isChecked() ? 'rows.select.all' : 'rows.unselect.all');
					}
				}
			});

			this.update = function() {
				_checkbox.setChecked(_context.selectRows.rowFirstColumns.length == _context.rowCount);
			};

			_context.event.register('row.select', _this.update);
			_context.event.register('row.unselect', _this.update);
		}else {
			_context.selectRows.selectMulti = false;
		}
	}
}

//表格头功能行对象
function KuiTableHeadActionRow(context, inst) {
	var _this = this;
	var _context = context;
	var _inst = inst;

	var _checkbox = null;
	var _selectCountCase = $('.select-count', _inst);

	(function() {
		var t = $($('>th:nth-child(1)', _inst).children().get(0));
		if(t.is('label') && t.hasClass('checkbox')) {
			_checkbox = kui(t.data('bind'));
			if(_context.selectRows.selectMulti) {
				_checkbox.show();
				_checkbox.setOptions({
					onChange : function(self, src) {
						if(src == 'user') {
							_context.event.send(_checkbox.isChecked() ? 'rows.select.all' : 'rows.unselect.all');
						}
					}
				});
			}else {
				_checkbox.hide();
			}
		}
	})();

	this.show = function() {
		if(_checkbox) {
			_checkbox.setChecked(_context.selectRows.rowFirstColumns.length == _context.rowCount);
		}

		if(_selectCountCase) {
			_selectCountCase.text(_context.selectRows.rowFirstColumns.length);
		}

		_inst.show();
	};

	this.hide = function() {
		_inst.hide();
	};
}

//表格主体对象
function KuiTableBody(context, inst) {
	var _this = this;
	var _context = context;
	var _inst = inst;

	_context.body = _this;

	var _rows = [];

	(function() {
		var index = 0;
		$('tr', _inst).each(function() {
			var row = new KuiTableBodyRow(_context, $(this), index);
			_rows.push(row);
			index++;
		});
		_context.rowCount = _rows.length;
	})();

	//显示指定列
	this.showColumn = function(index) {
		for(var i = 0; i < _rows.length; i++) {
			_rows[i].showColumn(index);
		}
	};

	//隐藏指定列
	this.hideColumn = function(index) {
		for(var i = 0; i < _rows.length; i++) {
			_rows[i].hideColumn(index);
		}
	};

	//设置表格数据
	this.updateData = function(data) {
		_this.clearData();
		if(data && $.isArray(data)) {
			for(var x = 0; x < data.length; x++) {
				var rowData = data[x];
				var tr = $('<tr></tr>');
				if(rowData && typeof(rowData) == 'object') {
					var size = _context.columnCount;
					if(_context.selectRows.enabled) {
						tr.append('<td><label class="checkbox"><span><span><span><svg viewBox="0 0 15 15.343"><path d="M1.013 8.11c0-.223.078-.412.234-.568l1.14-1.14c.155-.155.345-.233.568-.233s.413.077.57.233l2.46 2.47 5.492-5.5c.156-.156.346-.234.568-.234.224 0 .413.077.57.233l1.138 1.14c.156.155.234.345.234.568 0 .224-.078.414-.234.57l-6.06 6.06-1.14 1.14c-.155.155-.345.233-.568.233s-.413-.078-.57-.234l-1.138-1.14-3.03-3.03c-.156-.156-.234-.346-.234-.57z"></path></svg></span></span></span></label></td>');
						size--;
					}
					if($.isArray(rowData)) {
						var y = 0;
						for(; y < rowData.length && y < size; y++) {
							var colData = rowData[y];
							tr.append($('<td>' + (typeof(colData.value) == 'function' ? colData.value() : colData.value) + '</td>'));
						}

						if(y < size) {
							var range = _context.columnCount - y;
							for(var i = 0; i < range; i++) {
								tr.append($('<td></td>'));
							}
						}
					}else {
						var columns = _context.head.getColumns();
						for(var i = 0; i < columns.length; i++) {
							var col = columns[i];
							if(col.isFieldColumn()) {
								var value = eval('rowData.' + col.getFieldName());
								value = value ? typeof(value) == 'function' ? value() : value : col.getFieldDefault();
								var format = col.getFieldFormat();
								if(format) {
									value = format(value);
								}
								tr.append($('<td>' + value + '</td>'));
							}
						}
					}
				}
				_inst.append(tr);
				initKui(tr);

				var row = new KuiTableBodyRow(_context, tr, x, rowData);
				_rows.push(row);
			}
			_context.rowCount = _rows.length;
		}
	};

	//清空表格数据
	this.clearData = function() {
		for(var i = 0; i < _rows.length; i++) {
			_rows[i].remove();
		}
		_rows = [];
		_context.rowCount = 0;
		_context.selectRows.rowFirstColumns = [];
		_context.head.update();
	};
}

//表格主体行对象
function KuiTableBodyRow(context, inst, index, data) {
	var _this = this;
	var _context = context;
	var _inst = inst;
	var _index = index;
	var _data = data;

	//获得行所在索引位
	this.getIndex = function() {
		return _index;
	};
	
	//获得行原始数据
	this.getData = function() {
		return _data;
	};
	
	//设置行原始数据
	this.setData = function(data) {
		_data = data;
	};

	var _columns = [];

	(function() {
		var index = 0;
		$('td', _inst).each(function() {
			var col = new KuiTableBodyColumn(_context, _this, index, $(this));
			_columns.push(col);
			index++;
		});
	})();

	//显示指定列
	this.showColumn = function(index) {
		if(index >= 0 && index < _columns.length) {
			_columns[index].show();
		}
	};

	//隐藏指定列
	this.hideColumn = function(index) {
		if(index >= 0 && index < _columns.length) {
			_columns[index].hide();
		}
	};

	this.remove = function() {
		for(var i = 0; i < _columns.length; i++) {
			_columns[i].remove();
		}
		_inst.remove();
	};
}

//表格主体列对象
function KuiTableBodyColumn(context, row, index, inst) {
	var _this = this;
	var _context = context;
	var _row = row;
	var _index = index;
	var _inst = inst;

	var _checkbox = null; //如果_context.selectRows.enabled=true，则关联checkbox对象

	this.getRow = function() {
		return _row;
	};

	this.getIndex = function() {
		return _index;
	};

	this.show = function() {
		_inst.show();
	};

	this.hide = function() {
		_inst.hide();
	};

	this.remove = function() {
		_inst.remove();
		_context.event.unbind(_this);
	};

	if(_index == 0 && _context.selectRows.enabled) {
		var _case = $(_inst.children().get(0));
		if(_case.is('label') && _case.hasClass('checkbox')) {
			_checkbox = kui(_case.data('bind'));
			_checkbox.setOptions({
				onChange : function() {
					if(_checkbox.isChecked()) {
						if(_context.selectRows.selectMulti) {
							_context.selectRows.rowFirstColumns.push(_this);
						}else {
							if(_context.selectRows.rowFirstColumns.length > 0) {
								for(var i = 0; i < _context.selectRows.rowFirstColumns.length; i++) {
									_context.selectRows.rowFirstColumns[i].unselect();
								}
							}
							_context.selectRows.rowFirstColumns = [_this];
						}
						_context.event.send('row.select');
					}else {
						if(_context.selectRows.selectMulti) {
							if(_context.selectRows.rowFirstColumns.length > 0) {
								for(var i = 0; i < _context.selectRows.rowFirstColumns.length; i++) {
									if(_this.getRow() == _context.selectRows.rowFirstColumns[i].getRow()) {
										_context.selectRows.rowFirstColumns.splice(i, 1);
										break;
									}
								}
							}
						}else {
							_context.selectRows.rowFirstColumns = [];
						}
						_context.event.send('row.unselect');
					}
				}
			});

			_this.unselect = function() {
				_checkbox.setChecked(false);
			};

			_context.event.register('rows.select.all', function() {
				_checkbox.setChecked(true);
			}, _this);

			_context.event.register('rows.unselect.all', function() {
				_checkbox.setChecked(false);
			}, _this);
		}
	}
}

//表格盒子对象
function KuiTableBox(inst) {
	var _this = this;
	var _inst = inst;
	
	var _table = null; //表格对象
	var _paginator = null; //分页器对象
	
	(function() {
		var list = $('>table', _inst);
		if(list.length > 0) {
			_table = kui($(list[0]).data('bind'));
		}
		
		list = $('>nav', _inst);
		if(list.length > 0) {
			_paginator = new KuiTableBoxPaginator($(list[0]), _table);
			bindKuiObj(_paginator);
		}
	})();

	this.id = function() {
		return _inst.attr('id');
	};

	this.bind = function() {
		return _inst.data('bind');
	};
	
	this.getTable = function() {
		return _table;
	};
	
	this.getPaginator = function() {
		return _paginator;
	};
}

//表格盒子内的分页器对象
function KuiTableBoxPaginator(inst, table) {
	var _this = this;
	var _inst = inst;
	var _table = table;
	
	var _firstPageBtn = null; //首页按钮，jquery对象
	var _prevPageBtn = null; //上一页按钮，jquery对象
	var _pageSelector = null; //页数选择器，jquery对象
	var _nextPageBtn = null; //下一页按钮，jquery对象
	var _lastPageBtn = null; //尾页按钮，jquery对象
	
	var _pageList = []; //页数对象列表，jquery对象
	
	var _totalPage = 1; //总页数
	var _curPage = 1; //当前页数
	
	var _onChangePage = null; //切换页数时的回调函数
	
	this.id = function() {
		return _inst.attr('id');
	};

	this.bind = function() {
		return _inst.data('bind');
	};
	
	this.totalPage = function() {
		return _totalPage;
	};
	
	this.curPage = function() {
		return _curPage;
	};
	
	(function() {
		var list = $('>span', _inst);
		if(list.length >= 5) {
			_firstPageBtn = $($('>button', $(list[0]))[0]);
			_prevPageBtn = $($('>button', $(list[1]))[0]);
			_pageSelector = $(list[2]);
			_nextPageBtn = $($('>button', $(list[3]))[0]);
			_lastPageBtn = $($('>button', $(list[4]))[0]);
		}else {
			return;
		}
	})();
	
	this.reset = function(totalPage, curPage) {
		_totalPage = totalPage;
		if(_totalPage < 1) {
			_totalPage = 1;
		}
		_this.update(curPage);
	};
	
	this.update = function(curPage) {
		_curPage = curPage;
		if(_curPage < 1) {
			_curPage = 1;
		}else if(_curPage > _totalPage) {
			_curPage = _totalPage;
		}
		
		var startPage = _curPage - 2;
		if(startPage < 1) {
			startPage = 1;
		}
		
		var endPage = _curPage + (5 - (_curPage - startPage + 1));
		if(endPage > _totalPage) {
			endPage = _totalPage;
		}
		
		_pageSelector.empty();
		_pageList = [];
		
		var size = endPage - startPage + 1;
		if(size < 5 && startPage > 1) {
			size = 5 - size;
			for(var i = 0; i < size; i++) {
				if(startPage - 1 >= 1) {
					startPage--;
				}else {
					break;
				}
			}
		}
		
		size = endPage - startPage + 1;
		for(var i = 0; i < size; i++) {
			var page = startPage + i;
			var t = $('<button>' + page + '</button>');
			t.data('page', page);
			if(page == _curPage) {
				t.addClass('active');
			}
			t.click(function() {
				_this.changePage($(this).data('page'));
			});
			_pageSelector.append(t);
			_pageList.push(t);
		}
		
		_firstPageBtn.removeClass('disabled');
		_prevPageBtn.removeClass('disabled');
		_nextPageBtn.removeClass('disabled');
		_lastPageBtn.removeClass('disabled');
		
		_firstPageBtn.unbind();
		_prevPageBtn.unbind();
		_nextPageBtn.unbind();
		_lastPageBtn.unbind();
		
		if(_curPage == 1) {
			_firstPageBtn.addClass('disabled');
			_prevPageBtn.addClass('disabled');
		}else {
			_firstPageBtn.click(function() {
				_this.changePage(1);
			});
			_prevPageBtn.click(function() {
				_this.changePage(_curPage - 1);
			});
		}
		
		if(_curPage == _totalPage) {
			_nextPageBtn.addClass('disabled');
			_lastPageBtn.addClass('disabled');
		}else {
			_nextPageBtn.click(function() {
				_this.changePage(_curPage + 1);
			});
			_lastPageBtn.click(function() {
				_this.changePage(_totalPage);
			});
		}
	};
	
	this.changePage = function(page) {
		if(_onChangePage) {
			if(page < 1) {
				page = 1;
			}else if(page > _totalPage) {
				page = _totalPage;
			}
			_onChangePage(page, _this, _table);
		}
	};
	
	this.addListener = function(handler) {
		if(typeof(handler) == 'function') {
			_onChangePage = handler;
		}
	};
	
	this.removeListener = function() {
		_onChangePage = null;
	};
	
	(function() {
		var totalPage = parseInt(_pageSelector.data('total-page'));
		var page = parseInt(_pageSelector.data('page'));
		_this.reset(isNaN(totalPage) ? 1 : totalPage, isNaN(page) ? 1 : page);
	})();
}

//模态框对象
function KuiModal(inst) {
	var _this = this;
	var _inst = inst;
	
	var _box = $($('>div>div', _inst)[0]);
	var _window = $('>div:nth-child(1)', _inst); //窗口jquery对象
	
	var _status = 'close';
	
	var _options = {
		onOpened : null, //模态框打开后的回调函数
		onClosed : null //模态框关闭后的回调函数
	};
	
	(function() {
		$('>div>div>header>div>button', _inst).click(function() {
			_this.close();
		});
	})();
	
	this.id = function() {
		return _inst.attr('id');
	};

	this.bind = function() {
		return _inst.data('bind');
	};
	
	this.status = function() {
		return _status;
	};
	
	this.getOptions = function() {
		return _options;
	};

	this.setOptions = function(options) {
		if(typeof(options) == 'object') {
			if(typeof(options.onOpened) == 'function') {
				_options.onOpened = options.onOpened;
			}
			if(typeof(options.onClosed) == 'function') {
				_options.onClosed = options.onClosed;
			}
		}
	};
	
	this.open = function() {
		if(_status == 'close') {
			_status = 'open';
			_inst.fadeIn('fast');
			_box.addClass('show');
			$('.kui-layout', _inst).each(function() {
				kui($(this).data('bind')).resize();
			});
			if(_options.onOpened) {
				_options.onOpened();
			}
		}
	};
	
	this.close = function() {
		if(_status == 'open') {
			_status = 'close';
			_box.removeClass('show');
			setTimeout(function() {
				_inst.fadeOut('fast', function() {
					if(_options.onClosed) {
						_options.onClosed();
					}
				});
			}, 300);
		}
	};
	
	this.remove = function() {
		_inst.remove();
	};
}

//侧边栏模态框对象
function KuiSidebarModal(inst) {
	var _this = this;
	var _inst = inst;
	
	var _window = $('>div:nth-child(1)', _inst); //窗口jquery对象
	
	var _status = 'close';
	var _data = null;
	
	var _options = {
		position : 'right', //窗口出现方位
		onOpened : null, //模态框打开后的回调函数
		onClosed : null //模态框关闭后的回调函数
	};
	
	(function() {
		var pos = _inst.data('position');
		if(pos == 'left' || pos == 'right') {
			_options.position = pos;
		}
	})();
	
	this.id = function() {
		return _inst.attr('id');
	};

	this.bind = function() {
		return _inst.data('bind');
	};
	
	this.status = function() {
		return _status;
	};
	
	this.getData = function() {
		return _data;
	};
	
	this.setData = function(data) {
		_data = data ? typeof(data) == 'function' ? data() : data : null;
	};
	
	this.getPosition = function() {
		return _options.position;
	};
	
	this.setPosition = function(pos) {
		if(pos) {
			pos = typeof(pos) == 'function' ? pos() : pos;
			if(pos == 'left' || pos == 'right') {
				_options.position = pos;
			}
		}
	};
	
	this.getOptions = function() {
		return _options;
	};

	this.setOptions = function(options) {
		if(typeof(options) == 'object') {
			if(typeof(options.onClosed) == 'function') {
				_options.onClosed = options.onClosed;
			}
			if(typeof(options.onOpened) == 'function') {
				_options.onOpened = options.onOpened;
			}
		}
	};
	
	this.open = function(data) {
		if(_status == 'close') {
			_status = 'open';
			_this.setData(data);
			_inst.fadeIn('fast');
			if(_options.position == 'right') {
				_window.css('right', -1 * _window.width());
				_window.animate({right:0}, function() {
					if(_options.onOpened) {
						_options.onOpened(_this);
					}
				});
			}else {
				_window.css('left', -1 * _window.width());
				_window.animate({left:0}, function() {
					if(_options.onOpened) {
						_options.onOpened(_this);
					}
				});
			}
		}
	};
	
	this.close = function() {
		if(_status == 'open') {
			_status = 'close';
			var next = function() {
				_inst.fadeOut('fast', function() {
					if(_options.onClosed) {
						_options.onClosed(_this);
					}
					_data = null;
				});
			};
			if(_options.position == 'right') {
				_window.animate({right:-1 * _window.width()}, function() {
					next();
				});
			}else {
				_window.animate({left:-1 * _window.width()}, function() {
					next();
				});
			}
		}
	};
	
	this.remove = function() {
		_inst.remove();
		_data = null;
	};
}

//表单字段对象
function KuiFormField(inst, index) {
	var _this = this;
	var _inst = inst;
	var _index = index;
	
	var _type = null;
	
	/**
	 * 字段实例提供者，公共方法方法包括:
	 * 	getValue : 获取值
	 * 	setValue : 设置值
	 * 	error : 设置错误信息
	 * 	reset : 重置到默认状态
	 */
	var _provider = null;
	
	(function() {
		var type = _inst.data('field');
		if(typeof(type) == 'undefined' || type == '') {
			return;
		}
		_type = type;
		
		switch(_type) {
			case 'text':
				_provider = new (function(inst) {
					var _this = this;
					var _inst = inst;
					var _error = null;
					
					var _defaultValue = _inst.html();
					
					this.getValue = function(format) {
						return format ? format(_inst.html()) : _inst.html();
					};
					
					this.setValue = function(value) {
						_inst.html(value);
					};
					
					this.error = function(msg) {
						if(msg) {
							if(_error) {
								_error.html(typeof(msg) == 'function' ? msg() : msg);
								_error.show();
							}else {
								_error = $('<div class="text-error">' + (typeof(msg) == 'function' ? msg() : msg) + '</div>');
								_inst.after(_error);
							}
						}else if(_error) {
							_error.empty();
							_error.hide();
						}
					};
					
					this.reset = function() {
						_inst.html(_defaultValue);
					};
				})(_inst);
				break;
			case 'input':
				var list = $('>input', _inst);
				if(list.length > 0) {
					_provider = new (function(inst) {
						var _this = this;
						var _inst = inst;
						var _type = _inst.attr('type');
						var _error = null;
						
						var _defaultValue = _inst.val();
						
						this.getValue = function(format) {
							return format ? format(_inst.val()) : _inst.val();
						};
						
						this.setValue = function(value) {
							_inst.val(value);
						};
						
						this.error = function(msg) {
							if(msg) {
								if(_error) {
									_error.html(typeof(msg) == 'function' ? msg() : msg);
									_error.show();
								}else {
									_error = $('<div class="text-error">' + (typeof(msg) == 'function' ? msg() : msg) + '</div>');
									_inst.after(_error);
								}
							}else if(_error) {
								_error.empty();
								_error.hide();
							}
						};
						
						this.reset = function() {
							_inst.val(_defaultValue);
						};
						
						_inst.focus(function() {
							_this.error('');
						});
					})($(list[0]));
				}
				break;
			case 'textarea':
				var list = $('>textarea', _inst);
				if(list.length > 0) {
					_provider = new (function(inst) {
						var _this = this;
						var _inst = inst;
						var _error = null;
						
						var _defaultValue = _inst.val();
						
						this.getValue = function(format) {
							return format ? format(_inst.val()) : _inst.val();
						};
						
						this.setValue = function(value) {
							_inst.val(value);
						};
						
						this.error = function(msg) {
							if(msg) {
								if(_error) {
									_error.html(typeof(msg) == 'function' ? msg() : msg);
									_error.show();
								}else {
									_error = $('<div class="text-error">' + (typeof(msg) == 'function' ? msg() : msg) + '</div>');
									_inst.after(_error);
								}
							}else if(_error) {
								_error.empty();
								_error.hide();
							}
						};
						
						this.reset = function() {
							_inst.val(_defaultValue);
						};
						
						_inst.focus(function() {
							_this.error('');
						});
					})($(list[0]));
				}
				break;
			case 'button':
				var list = $('>button', _inst);
				if(list.length > 0) {
					_provider = new (function(inst) {
						var _this = this;
						var _inst = inst;
						var _error = null;
						
						var _btn = kui(_inst.data('bind'));
						
						this.getValue = function(format) {
							return _btn.getData(format);
						};
						
						this.setValue = function(value) {
							_btn.setData(value);
						};
						
						this.error = function(msg) {
							if(msg) {
								if(_error) {
									_error.html(typeof(msg) == 'function' ? msg() : msg);
									_error.show();
								}else {
									_error = $('<div class="text-error">' + (typeof(msg) == 'function' ? msg() : msg) + '</div>');
									_inst.after(_error);
								}
							}else if(_error) {
								_error.empty();
								_error.hide();
							}
						};
						
						this.reset = function() {
							_btn.reset();
						};
						
						_inst.focus(function() {
							_this.error('');
						});
					})($(list[0]));
				}
				break;
		}
	})();
	
	this.id = function() {
		return _inst.attr('id');
	};

	this.bind = function() {
		return _inst.data('bind');
	};
	
	this.index = function() {
		return _index;
	};
	
	this.type = function() {
		return _type;
	};
	
	this.provider = function() {
		return _provider;
	};
	
	this.getValue = function(format) {
		return _provider ? _provider.getValue(format) : null;
	};
	
	this.setValue = function(value) {
		if(_provider) {
			_provider.setValue(value);
		}
	};
	
	this.error = function(msg) {
		if(_provider) {
			_provider.error(msg);
		}
	};
	
	this.reset = function() {
		if(_provider) {
			_provider.reset();
		}
	};
}

//模态框表单对象
function KuiModalForm(inst) {
	var _this = this;
	var _inst = inst;
	
	var _title = $('>header:nth-child(1)>div:nth-child(1)>h3:nth-child(1)', _inst);
	var _body = $('>div:nth-child(2)', _inst);
	var _loading = null;
	
	var _modules = [];
	var _moduleLookup = {id:{}, bind:{}};
	
	(function() {
		var list = $('>div>section', _inst);
		for(var i = 0; i < list.length; i++) {
			var module = new KuiModalFormModule($(list[i]), i);
			_modules.push(module);
			
			var id = module.id();
			if(typeof(id) != 'undefined') {
				_moduleLookup.id[id] = module;
			}

			var bind = module.bind();
			if(typeof(bind) != 'undefined') {
				_moduleLookup.bind[bind] = module;
			}
		}
	})();
	
	this.id = function() {
		return _inst.attr('id');
	};

	this.bind = function() {
		return _inst.data('bind');
	};
	
	this.setTitle = function(value) {
		_title.html(value);
	};
	
	this.showBody = function(callback) {
		_body.show(function() {
			if(callback) {
				callback(_this);
			}
		});
	};
	
	this.hideBody = function(callback) {
		_body.hide(function() {
			if(callback) {
				callback(_this);
			}
		});
	};
	
	this.showLoading = function(callback) {
		if(!_loading) {
			_loading = $('<div class="kui-loading" style="position:absolute;top:50%;left:50%;margin:-10px 0 0 -30px;"><div></div><div></div><div></div></div>');
			_inst.append(_loading);
		}
		_loading.show(function() {
			if(callback) {
				callback(_this);
			}
		});
	};
	
	this.hideLoading = function(callback) {
		if(_loading) {
			_loading.hide(function() {
				if(callback) {
					callback(_this);
				}
			});
		}
	};
	
	this.getModule = function(value) {
		if(typeof(value) == 'undefined') {
			return null;
		}
		
		if(typeof(value) == 'function') {
			value = value();
		}
		
		if(typeof(value) == 'number') {
			if(value < 0 || value > _modules.length - 1) {
				return null;
			}
			return _modules[value];
		}
		
		var module = _moduleLookup.id[value];
		if(!module) {
			module = _moduleLookup.bind[value];
		}

		return typeof(module) == 'undefined' ? null : module;
	};
	
	this.getField = function(module, field) {
		var module = _this.getModule(module);
		return module ? module.getField(field) : null;
	};
	
	this.reset = function() {
		for(var i = 0; i < _modules.length; i++) {
			_modules[i].reset();
		}
	};
}

//模态框表单模块对象
function KuiModalFormModule(inst, index) {
	var _this = this;
	var _inst = inst;
	var _index = index;
	
	var _fields = [];
	var _fieldLookup = {id:{}, bind:{}};
	
	(function() {
		var list = $('>div', _inst);
		for(var i = 0; i < list.length; i++) {
			var t = $(list[i]);
			var temp = $('>div', t);
			if(temp.length > 0) {
				var field = new KuiFormField($(temp[0]), _fields.length);
				_fields.push(field);
				
				var id = field.id();
				if(typeof(id) != 'undefined') {
					_fieldLookup.id[id] = field;
				}

				var bind = field.bind();
				if(typeof(bind) != 'undefined') {
					_fieldLookup.bind[bind] = field;
				}
			}
		}
	})();
	
	this.id = function() {
		return _inst.attr('id');
	};

	this.bind = function() {
		return _inst.data('bind');
	};
	
	this.index = function() {
		return _index;
	};
	
	this.getField = function(value) {
		if(typeof(value) == 'undefined') {
			return null;
		}
		
		if(typeof(value) == 'function') {
			value = value();
		}
		
		if(typeof(value) == 'number') {
			if(value < 0 || value > _fields.length - 1) {
				return null;
			}
			return _fields[value];
		}
		
		var field = _fieldLookup.id[value];
		if(!field) {
			field = _fieldLookup.bind[value];
		}

		return typeof(field) == 'undefined' ? null : field;
	};
	
	this.reset = function() {
		for(var i = 0; i < _fields.length; i++) {
			_fields[i].reset();
		}
	};
}

//布局对象
function KuiLayout(inst) {
	var _this = this;
	var _inst = inst;
	
	(function() {
		var bind = _inst.data('bind');
		if(typeof(bind) == 'undefined' || bind == '') {
			_inst.data('bind', 'sys-kui-layout-' + ++KUI_OBJ_SYSBIND_COUNTER['kui-layout']);
		}
	})();
	
	this.id = function() {
		return _inst.attr('id');
	};

	this.bind = function() {
		return _inst.data('bind');
	};
	
	var _type = _inst.data('layout')
	
	this.type = function() {
		return _type;
	};
	
	/**
	 * layout实例提供者，公共方法方法包括:
	 * 	resize : 调整尺寸
	 */
	var _provider = null;
	
	this.provider = function() {
		return _provider;
	};
	
	switch(_type) {
		case 'v3-bf':
			var list = $('>div', _inst);
			if(list.length >= 2) {
				_inst.addClass('kui-layout-v3-bf');
				_provider = new (function() {
					var _body = $(list[0]);
					var _footer = $(list[1]);
					
					this.resize = function() {
						_inst.css({
							paddingBottom : _footer.outerHeight(true)
						});
					};
				})();
			}
			break;
		case 'v3-hbf':
			var list = $('>div', _inst);
			if(list.length >= 3) {
				_inst.addClass('kui-layout-v3-hbf');
				_provider = new (function() {
					var _header = $(list[0]);
					var _body = $(list[1]);
					var _footer = $(list[2]);
					
					this.resize = function() {
						_inst.css({
							paddingTop : _header.outerHeight(true),
							paddingBottom : _footer.outerHeight(true)
						});
					};
				})();
			}
			break;
	}
	
	this.resize = function() {
		if(_provider) {
			_provider.resize();
		}
	};
}

//普通确认框对象
function KuiConfirm() {
	var _this = this;
	var _inst = $('<div class="kui-confirm"><div><div><div><section><h2></h2><div></div></section><footer><div><button class="primary"></button><button class="light"></button></div></footer></div></div></div></div>');

	$(document.body).append(_inst);

	var _box = $($('>div>div>div', _inst)[0]);
	var _title = $($('>div>div>div>section>h2', _inst)[0]);
	var _msg = $($('>div>div>div>section>div', _inst)[0]);
	var _confirmBtn = $($('>div>div>div>footer>div>button:nth-child(1)', _inst)[0]);
	var _cancelBtn = $($('>div>div>div>footer>div>button:nth-child(2)', _inst)[0]);

	var _options = null;

	this.open = function(options) {
		_options = options;
		if(options && typeof(options) == 'object') {
			if(options.title) {
				if(typeof(options.title) == 'function') {
					_title.html(options.title());
				}else {
					_title.html(options.title);
				}
			}
			if(options.msg) {
				if(typeof(options.msg) == 'function') {
					_msg.html(options.msg());
				}else {
					_msg.html(options.msg);
				}
			}
			if(options.btns && $.isArray(options.btns)) {
				if(options.btns.length > 0) {
					var value = options.btns[0];
					_confirmBtn.html(typeof(value) == value ? ('function' ? value() : value) : '确认');
					if(options.btns.length > 1) {
						value = options.btns[1];
						_cancelBtn.html(typeof(value) == 'function' ? value() : value);
					}else {
						_cancelBtn.text('取消');
					}
				}else {
					_confirmBtn.text('确认');
					_cancelBtn.text('取消');
				}
			}else {
				_confirmBtn.text('确认');
				_cancelBtn.text('取消');
			}
		}
		_inst.fadeIn('fast');
		_box.addClass('show');
	};

	this.close = function(callback) {
		_box.removeClass('show');
		_inst.fadeOut('fast', function() {
			_options = null;
			if(callback) {
				callback(_this);
			}
		});
	};

	this.remove = function() {
		_inst.remove();
	};

	_confirmBtn.click(function() {
		if(_options && typeof(_options) == 'object' && _options.onConfirm && typeof(_options.onConfirm) == 'function') {
			_this.close(_options.onConfirm);
		}else {
			_this.close();
		}
	});

	_cancelBtn.click(function() {
		if(_options && typeof(_options) == 'object' && _options.onCancel && typeof(_options.onCancel) == 'function') {
			_this.close(_options.onCancel);
		}else {
			_this.close();
		}
	});
}

function kuiConfirm(title, msg, btns, handler) {
	new KuiConfirm().open({
		title : title,
		msg : msg,
		btns : btns,
		onConfirm : function(self) {
			self.remove();
			if(handler && typeof(handler) == 'function') {
				handler(true);
			}
		},
		onCancel : function(self) {
			self.remove();
			if(handler && typeof(handler) == 'function') {
				handler(false);
			}
		}
	});
}

//警告确认框对象
function KuiWarnConfirm() {
	var _this = this;
	var _inst = $('<div class="kui-confirm-warn"><div><div><div><section><h2></h2><div></div></section><footer><div><button class="danger"></button><button class="light"></button></div></footer></div></div></div></div>');

	$(document.body).append(_inst);

	var _box = $($('>div>div>div', _inst)[0]);
	var _title = $($('>div>div>div>section>h2', _inst)[0]);
	var _msg = $($('>div>div>div>section>div', _inst)[0]);
	var _confirmBtn = $($('>div>div>div>footer>div>button:nth-child(1)', _inst)[0]);
	var _cancelBtn = $($('>div>div>div>footer>div>button:nth-child(2)', _inst)[0]);

	var _options = null;

	this.open = function(options) {
		_options = options;
		if(options && typeof(options) == 'object') {
			if(options.title) {
				if(typeof(options.title) == 'function') {
					_title.html(options.title());
				}else {
					_title.html(options.title);
				}
			}
			if(options.msg) {
				if(typeof(options.msg) == 'function') {
					_msg.html(options.msg());
				}else {
					_msg.html(options.msg);
				}
			}
			if(options.btns && $.isArray(options.btns)) {
				if(options.btns.length > 0) {
					var value = options.btns[0];
					_confirmBtn.html(typeof(value) == value ? ('function' ? value() : value) : '确认');
					if(options.btns.length > 1) {
						value = options.btns[1];
						_cancelBtn.html(typeof(value) == 'function' ? value() : value);
					}else {
						_cancelBtn.text('取消');
					}
				}else {
					_confirmBtn.text('确认');
					_cancelBtn.text('取消');
				}
			}else {
				_confirmBtn.text('确认');
				_cancelBtn.text('取消');
			}
		}
		_inst.fadeIn('fast');
		_box.addClass('show');
	};

	this.close = function(callback) {
		_box.removeClass('show');
		_inst.fadeOut('fast', function() {
			_options = null;
			if(callback) {
				callback(_this);
			}
		});
	};

	this.remove = function() {
		_inst.remove();
	};

	_confirmBtn.click(function() {
		if(_options && typeof(_options) == 'object' && _options.onConfirm && typeof(_options.onConfirm) == 'function') {
			_this.close(_options.onConfirm);
		}else {
			_this.close();
		}
	});

	_cancelBtn.click(function() {
		if(_options && typeof(_options) == 'object' && _options.onCancel && typeof(_options.onCancel) == 'function') {
			_this.close(_options.onCancel);
		}else {
			_this.close();
		}
	});
}

function kuiWarnConfirm(title, msg, btns, handler) {
	new KuiWarnConfirm().open({
		title : title,
		msg : msg,
		btns : btns,
		onConfirm : function(self) {
			self.remove();
			if(handler && typeof(handler) == 'function') {
				handler(true);
			}
		},
		onCancel : function(self) {
			self.remove();
			if(handler && typeof(handler) == 'function') {
				handler(false);
			}
		}
	});
}

//绑定UI，obj是UI对象
function bindKuiObj(obj) {
	var id = obj.id();
	if(typeof(id) != 'undefined') {
		KUI_OBJ_LOOKUP.id[id] = obj;
	}

	var bind = obj.bind();
	if(typeof(bind) != 'undefined') {
		KUI_OBJ_LOOKUP.bind[bind] = obj;
	}
}

//初始化button元素
function initElementKuiButton(parent) {
	$('button', parent ? parent : $(document.body)).each(function() {
		bindKuiObj(new KuiButton($(this)));
	});
}

//初始化Label下的Checkbox组件
function initClassKuiLabelCheckbox(parent) {
	$('label.checkbox', parent ? parent : $(document.body)).each(function() {
		bindKuiObj(new KuiLabelCheckbox($(this)));
	});
}

//初始化自动搜索框组件
function initClassKuiAutosearchInput(parent) {
	$('.kui-autosearch-input', parent ? parent : $(document.body)).each(function() {
		bindKuiObj(new KuiAutosearchInput($(this)));
	});
}

//初始化加载动画组件
function initClassKuiLoading(parent) {
	$('.kui-loading', parent ? parent : $(document.body)).each(function() {
		bindKuiObj(new KuiLoading($(this)));
	});
}

//初始化顶部导航
function initClassKuiTopnav(parent) {
	$('.kui-topnav', parent ? parent : $(document.body)).each(function() {
		bindKuiObj(new KuiTopnav($(this)));
	});
}

//初始化侧边导航栏
function initClassKuiSidenav(parent) {
	$('.kui-sidenav', parent ? parent : $(document.body)).each(function() {
		bindKuiObj(new KuiSidenav($(this)));
	});
}

//初始化表格
function initClassKuiTable(parent) {
	$('.kui-table', parent ? parent : $(document.body)).each(function() {
		bindKuiObj(new KuiTable($(this)));
	});
}

//初始化表格盒子
function initClassKuiTableBox(parent) {
	$('.kui-table-box', parent ? parent : $(document.body)).each(function() {
		bindKuiObj(new KuiTableBox($(this)));
	});
}

//初始化模态框
function initClassKuiModal(parent) {
	$('.kui-modal', parent ? parent : $(document.body)).each(function() {
		bindKuiObj(new KuiModal($(this)));
	});
}

//初始化侧边栏模态框
function initClassKuiSidebarModal(parent) {
	$('.kui-sidebar-modal', parent ? parent : $(document.body)).each(function() {
		bindKuiObj(new KuiSidebarModal($(this)));
	});
}

//初始化模态框表单
function initClassKuiModalForm(parent) {
	$('.kui-modal-form', parent ? parent : $(document.body)).each(function() {
		bindKuiObj(new KuiModalForm($(this)));
	});
}

//初始化布局
function initClassKuiLayout(parent) {
	$('.kui-layout', parent ? parent : $(document.body)).each(function() {
		bindKuiObj(new KuiLayout($(this)));
	});
}

//初始化带有data-action属性元素
function initDataAction(parent) {
	$('[data-action-close]', parent ? parent : $(document.body)).each(function() {
		var t = $(this);
		var bind = t.data('action-close');
		if(typeof(bind) != 'undefined' && bind != '') {
			var modal = kui(bind);
			if(modal) {
				t.data('modal', modal);
				t.click(function() {
					$(this).data('modal').close();
				});
			}
		}
	});
}

//初始化所有UI组件
function initKui(parent) {
	var initHandler = null;
	for(var i = 0; i < KUI_INIT_CLASSES.length; i++) {
		initHandler = KUI_CLASS_INIT_HANDLERS[KUI_INIT_CLASSES[i]];
		if(initHandler) {
			initHandler(parent);
		}
	}
	initDataAction(parent);
}

//页面加载完成时的首次初始化
$(document).ready(function() {
	initKui();
});