var GCMConfig = (function () {
    var _gameProviderHostNameList = [
        "1x2uk.com",
        "1x2gamingcdn.com",
        "blueprintgaming.com",
        "blueprintgaming.gi",
        "cdn.tgcn.io",
        "dpovs7i3r9tz1.cloudfront.net",
        "d28xrgbgehkc3v.cloudfront.net",
        "h5grgs.com",
        "inspiredvirgo.com",
        "agtonline.com",
        "finrings.com",
        "nyxop.net",
        "openbet.com",
        "pariplaygames.com",
        "d21j22mhfwmuah.cloudfront.net",
        "casinarena.com",
        "realisticgames.co.uk",
        "thunderkick.com",
        "greentube.com",
        "pragmaticplay.net",
        "gameiom.com",
        "gamevy.com",
        "rgs106.com",
        "dopamine-gaming.com",
    ];

    var _operator_Properties = {
        "1287": {
            "desktop": {
              commonUIUrl: "https://www.skyvegas.com/commonui",
            },
            "mobile": {
              commonUIUrl: "https://www.skyvegas.com/commonui",
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },
              gamesparks: {
                enabled: false,
              },
              jackpotQuery: {
                jqUrl: "https://jackpot-query-gg.nyxop.net/v3/jackpots",
                interval: "1000",
              },

            }
        },
        "1096": {
            "desktop": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ppb/html/client-adapter.html",
              operatorPostMsgLibrary: "https://ogs-gcm-eu-prod.nyxop.net/gcm/gcm-launcher/lib/ppw/ppbPostMsgLib.js",
            },
            "mobile": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ppb/html/client-adapter.html",
              operatorPostMsgLibrary: "https://ogs-gcm-eu-prod.nyxop.net/gcm/gcm-launcher/lib/ppw/ppbPostMsgLib.js",
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },

            }
        },
        "31": {
            "desktop": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/desktop-commonui/commonui.html",
            },
            "mobile": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/mobile-commonui/commonui.html",
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },
              gamesparks: {
                enabled: false,
              },
              jackpotQuery: {
                jqUrl: "https://jackpot-query-mt2.nyxop.net/v3/jackpots",
                interval: "1000",
              },

            }
        },
        "34": {
            "desktop": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/desktop-commonui/commonui.html",
            },
            "mobile": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/mobile-commonui/commonui.html",
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },
              gamesparks: {
                enabled: false,
              },
              jackpotQuery: {
                jqUrl: "https://jackpot-query-mt2.nyxop.net/v3/jackpots",
                interval: "1000",
              },

            }
        },
        "1081": {
            "desktop": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/desktop-commonui/commonui.html",
            },
            "mobile": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/mobile-commonui/commonui.html",
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },
              gamesparks: {
                enabled: false,
              },
              jackpotQuery: {
                jqUrl: "https://jackpot-query-mt2.nyxop.net/v3/jackpots",
                interval: "1000",
              },

            }
        },
        "581": {
            "desktop": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/desktop-commonui/commonui.html",
            },
            "mobile": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/mobile-commonui/commonui.html",
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },
              gamesparks: {
                enabled: true,
                mode: "live",
                apiKey: "C387603frLcG",
                credential: "device",
                gsUrl: "https://gam-registration-mt.nyxop.net/gs-registration"
              },
              jackpotQuery: {
                jqUrl: "https://jackpot-query-mt.nyxop.net/v3/jackpots",
                interval: "1000",
              },
              liveserv: {
                enabled: "true",
                url: "wss://ogs-liveserv-mt.nyxop.net/websock",
                retries: "10",
                cooldownSeconds: "300",
                maxRetryDelaySeconds: "60"
              },
              ogsClient: {
                enabled: "true",
                url: "https://ogs-client-api-mt.nyxop.net",
              },

            }
        },
        "567": {
            "desktop": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/desktop-commonui/commonui.html",
            },
            "mobile": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/mobile-commonui/commonui.html",
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },
              gamesparks: {
                enabled: false,
              },
              jackpotQuery: {
                jqUrl: "https://jackpot-query-mt2.nyxop.net/v3/jackpots",
                interval: "1000",
              },

            }
        },
        "446": {
            "desktop": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/desktop-commonui/commonui.html",
            },
            "mobile": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/mobile-commonui/commonui.html",
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },
              gamesparks: {
                enabled: false,
              },
              jackpotQuery: {
                jqUrl: "https://jackpot-query-gi.nyxop.net/v3/jackpots",
                interval: "1000",
              },

            }
        },
        "664": {
            "desktop": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/desktop-commonui/commonui.html",
            },
            "mobile": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/mobile-commonui/commonui.html",
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },
              gamesparks: {
                enabled: false,
              },
              jackpotQuery: {
                jqUrl: "https://jackpot-query-gi.nyxop.net/v3/jackpots",
                interval: "1000",
              },

            }
        },
        "622": {
            "desktop": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/desktop-commonui/commonui.html",
            },
            "mobile": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/mobile-commonui/commonui.html",
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },
              gamesparks: {
                enabled: true,
                mode: "live",
                apiKey: "G387590YhULt",
                credential: "device",
                gsUrl: "https://gam-registration-mt.nyxop.net/gs-registration"
              },
              jackpotQuery: {
                jqUrl: "https://jackpot-query-mt.nyxop.net/v3/jackpots",
                interval: "1000",
              },
              liveserv: {
                enabled: "true",
                url: "wss://ogs-liveserv-mt.nyxop.net/websock",
                retries: "10",
                cooldownSeconds: "300",
                maxRetryDelaySeconds: "60"
              },
              ogsClient: {
                enabled: "true",
                url: "https://ogs-client-api-mt.nyxop.net",
              },

            }
        },
        "28": {
            "desktop": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/desktop-commonui/commonui.html",
            },
            "mobile": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/mobile-commonui/commonui.html",
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },
              gamesparks: {
                enabled: false,
              },
              jackpotQuery: {
                jqUrl: "https://jackpot-query-mt.nyxop.net/v3/jackpots",
                interval: "1000",
              },
              liveserv: {
                enabled: "true",
                url: "wss://ogs-liveserv-mt.nyxop.net/websock",
                retries: "10",
                cooldownSeconds: "300",
                maxRetryDelaySeconds: "60"
              },
              ogsClient: {
                enabled: "true",
                url: "https://ogs-client-api-mt.nyxop.net",
              },

            }
        },
        "1083": {
            "desktop": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/desktop-commonui/commonui.html",
            },
            "mobile": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/mobile-commonui/commonui.html",
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },
              gamesparks: {
                enabled: false,
              },
              jackpotQuery: {
                jqUrl: "https://jackpot-query-mt2.nyxop.net/v3/jackpots",
                interval: "1000",
              },

            }
        },
        "213": {
            "desktop": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/desktop-commonui/commonui.html",
            },
            "mobile": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/mobile-commonui/commonui.html",
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },
              gamesparks: {
                enabled: true,
                mode: "live",
                apiKey: "X387602FJnYX",
                credential: "device",
                gsUrl: "https://gam-registration-mt.nyxop.net/gs-registration"
              },
              jackpotQuery: {
                jqUrl: "https://jackpot-query-mt.nyxop.net/v3/jackpots",
                interval: "1000",
              },
              liveserv: {
                enabled: "true",
                url: "wss://ogs-liveserv-mt.nyxop.net/websock",
                retries: "10",
                cooldownSeconds: "300",
                maxRetryDelaySeconds: "60"
              },
              ogsClient: {
                enabled: "true",
                url: "https://ogs-client-api-mt.nyxop.net",
              },

            }
        },
        "574": {
            "desktop": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/desktop-commonui/commonui.html",
            },
            "mobile": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/mobile-commonui/commonui.html",
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },
              gamesparks: {
                enabled: false,
              },
              jackpotQuery: {
                jqUrl: "https://jackpot-query-mt2.nyxop.net/v3/jackpots",
                interval: "1000",
              },

            }
        },
        "612": {
            "desktop": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/desktop-commonui/commonui.html",
            },
            "mobile": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/mobile-commonui/commonui.html",
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },
              gamesparks: {
                enabled: false,
              },
              jackpotQuery: {
                jqUrl: "https://jackpot-query-gi.nyxop.net/v3/jackpots",
                interval: "1000",
              },

            }
        },
        "423": {
            "desktop": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/desktop-commonui/commonui.html",
            },
            "mobile": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/mobile-commonui/commonui.html",
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },
              gamesparks: {
                enabled: true,
                mode: "live",
                apiKey: "m387587PrlEF",
                credential: "device",
                gsUrl: "https://gam-registration-mt.nyxop.net/gs-registration"
              },
              jackpotQuery: {
                jqUrl: "https://jackpot-query-mt.nyxop.net/v3/jackpots",
                interval: "1000",
              },
              liveserv: {
                enabled: "true",
                url: "wss://ogs-liveserv-mt.nyxop.net/websock",
                retries: "10",
                cooldownSeconds: "300",
                maxRetryDelaySeconds: "60"
              },
              ogsClient: {
                enabled: "true",
                url: "https://ogs-client-api-mt.nyxop.net",
              },

            }
        },
        "897": {
            "desktop": {
              commonUIUrl: "https://www.skyvegas.com/commonui",
            },
            "mobile": {
              commonUIUrl: "https://www.skyvegas.com/commonui",
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },
              gamesparks: {
                enabled: false,
              },
              jackpotQuery: {
                jqUrl: "https://jackpot-query-gg.nyxop.net/v3/jackpots",
                interval: "1000",
              },

            }
        },
        "27": {
            "desktop": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/desktop-commonui/commonui.html",
            },
            "mobile": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/mobile-commonui/commonui.html",
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },
              gamesparks: {
                enabled: true,
                mode: "live",
                apiKey: "o387739aEagN",
                credential: "device",
                gsUrl: "https://gam-registration-mt.nyxop.net/gs-registration"
              },
              jackpotQuery: {
                jqUrl: "https://jackpot-query-mt.nyxop.net/v3/jackpots",
                interval: "1000",
              },
              liveserv: {
                enabled: "true",
                url: "wss://ogs-liveserv-mt.nyxop.net/websock",
                retries: "10",
                cooldownSeconds: "300",
                maxRetryDelaySeconds: "60"
              },
              ogsClient: {
                enabled: "true",
                url: "https://ogs-client-api-mt.nyxop.net",
              },

            }
        },
        "962": {
            "desktop": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ppb/html/client-adapter.html",
              operatorPostMsgLibrary: "https://ogs-gcm-eu-prod.nyxop.net/gcm/gcm-launcher/lib/ppw/ppbPostMsgLib.js",
            },
            "mobile": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ppb/html/client-adapter.html",
              operatorPostMsgLibrary: "https://ogs-gcm-eu-prod.nyxop.net/gcm/gcm-launcher/lib/ppw/ppbPostMsgLib.js",
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },

            }
        },
        "1039": {
            "desktop": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/desktop-commonui/commonui.html",
            },
            "mobile": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/mobile-commonui/commonui.html",
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },
              gamesparks: {
                enabled: false,
              },
              jackpotQuery: {
                jqUrl: "https://jackpot-query-mt2.nyxop.net/v3/jackpots",
                interval: "1000",
              },

            }
        },
        "30": {
            "desktop": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/desktop-commonui/commonui.html",
            },
            "mobile": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/mobile-commonui/commonui.html",
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },
              gamesparks: {
                enabled: false,
              },
              jackpotQuery: {
                jqUrl: "https://jackpot-query-gg.nyxop.net/v3/jackpots",
                interval: "1000",
              },

            }
        },
        "1082": {
            "desktop": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/desktop-commonui/commonui.html",
            },
            "mobile": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/mobile-commonui/commonui.html",
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },
              gamesparks: {
                enabled: false,
              },
              jackpotQuery: {
                jqUrl: "https://jackpot-query-mt2.nyxop.net/v3/jackpots",
                interval: "1000",
              },

            }
        },
        "196": {
            "desktop": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/desktop-commonui/commonui.html",
            },
            "mobile": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/mobile-commonui/commonui.html",
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },
              gamesparks: {
                enabled: true,
                mode: "live",
                apiKey: "J387600PCUdh",
                credential: "device",
                gsUrl: "https://gam-registration-mt.nyxop.net/gs-registration"
              },
              jackpotQuery: {
                jqUrl: "https://jackpot-query-mt.nyxop.net/v3/jackpots",
                interval: "1000",
              },
              liveserv: {
                enabled: "true",
                url: "wss://ogs-liveserv-mt.nyxop.net/websock",
                retries: "10",
                cooldownSeconds: "300",
                maxRetryDelaySeconds: "60"
              },
              ogsClient: {
                enabled: "true",
                url: "https://ogs-client-api-mt.nyxop.net",
              },

            }
        },
        "1136": {
            "desktop": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/desktop-commonui/commonui.html",
            },
            "mobile": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/mobile-commonui/commonui.html",
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },
              gamesparks: {
                enabled: false,
              },
              jackpotQuery: {
                jqUrl: "https://jackpot-query-mt2.nyxop.net/v3/jackpots",
                interval: "1000",
              },

            }
        },
        "1055": {
            "desktop": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/desktop-commonui/commonui.html",
            },
            "mobile": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/mobile-commonui/commonui.html",
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },
              gamesparks: {
                enabled: false,
              },
              jackpotQuery: {
                jqUrl: "https://jackpot-query-mt2.nyxop.net/v3/jackpots",
                interval: "1000",
              },

            }
        },
        "939": {
            "desktop": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/desktop-commonui/commonui.html",
            },
            "mobile": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/mobile-commonui/commonui.html",
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },
              gamesparks: {
                enabled: false,
              },
              jackpotQuery: {
                jqUrl: "https://jackpot-query-mt2.nyxop.net/v3/jackpots",
                interval: "1000",
              },

            }
        },
        "662": {
            "desktop": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/desktop-commonui/commonui.html",
            },
            "mobile": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/mobile-commonui/commonui.html",
              scriptUrl: "https://ogs-gcm-eu-prod.nyxop.net/bede/bede-bridge.js",
              containerUrls: {
                  "grosvenorcasinos.com": "https://www.grosvenorcasinos.com/in-game-notifications",
                  "meccabingo.com": "https://www.meccabingo.com/in-game-notifications",
              },
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },

            }
        },
        "1171": {
            "desktop": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/desktop-commonui/commonui.html",
            },
            "mobile": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/mobile-commonui/commonui.html",
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },
              gamesparks: {
                enabled: false,
              },
              jackpotQuery: {
                jqUrl: "https://jackpot-query-mt2.nyxop.net/v3/jackpots",
                interval: "1000",
              },

            }
        },
        "29": {
            "desktop": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/desktop-commonui/commonui.html",
            },
            "mobile": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/mobile-commonui/commonui.html",
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },
              gamesparks: {
                enabled: false,
              },
              jackpotQuery: {
                jqUrl: "https://jackpot-query-gi.nyxop.net/v3/jackpots",
                interval: "1000",
              },

            }
        },
        "661": {
            "desktop": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/desktop-commonui/commonui.html",
            },
            "mobile": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/mobile-commonui/commonui.html",
              scriptUrl: "https://ogs-gcm-eu-prod.nyxop.net/bede/bede-bridge.js",
              containerUrls: {
                  "bingos.co.uk": "https://www.bingos.co.uk/bridge-container",
                  "pinkcasino.co.uk": "https://www.pinkcasino.co.uk/bridge-container",
                  "meccabingo.com": "https://www.meccabingo.com/in-game-notifications",
                  "ukcasino.com": "https://www.ukcasino.com/bridge-container",
                  "slotto.co.uk": "https://www.slotto.co.uk/bridge-container",
                  "bingoloopy.com": "https://www.bingoloopy.com/bridge-container",
                  "crownbingo.com": "https://www.crownbingo.com/bridge-container",
                  "21.co.uk": "https://www.21.co.uk/bridge-container",
                  "bingogodz": "https://www.bingogodz.com/bridge-container",
                  "betuk.com": "https://www.betuk.com/bridge-container",
                  "legs11.co.uk": "https://www.legs11.co.uk/bridge-container",
                  "slotboss.co.uk": "https://www.slotboss.co.uk/bridge-container",
                  "slotmob.com": "https://www.slotmob.com/bridge-container",
                  "castlejackpot.co.uk": "https://www.castlejackpot.co.uk/bridge-container",
                  "grosvenorcasinos.com": "https://www.grosvenorcasinos.com/in-game-notifications",
                  "mcasino.com": "https://www.mcasino.com/en/bridge-container",
                  "bingostars.com": "https://www.bingostars.com/bridge-container",
              },
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },

            }
        },
        "default": {
            "desktop": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/desktop-commonui/commonui.html",
            },
            "mobile": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/mobile-commonui/commonui.html",
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },
              gamesparks: {
                enabled: false,
              },
              jackpotQuery: {
                jqUrl: "https://jackpot-query-mt.nyxop.net/v3/jackpots",
                interval: "1000",
              },
              liveserv: {
                enabled: "true",
                url: "wss://ogs-liveserv-mt.nyxop.net/websock",
                retries: "10",
                cooldownSeconds: "300",
                maxRetryDelaySeconds: "60"
              },
              ogsClient: {
                enabled: "true",
                url: "https://ogs-client-api-mt.nyxop.net",
              },

            }
        },
        "104": {
            "desktop": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/desktop-commonui/commonui.html",
            },
            "mobile": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/mobile-commonui/commonui.html",
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },
              gamesparks: {
                enabled: true,
                mode: "live",
                apiKey: "S387586KL9SR",
                credential: "device",
                gsUrl: "https://gam-registration-mt.nyxop.net/gs-registration"
              },
              jackpotQuery: {
                jqUrl: "https://jackpot-query-mt.nyxop.net/v3/jackpots",
                interval: "1000",
              },
              liveserv: {
                enabled: "true",
                url: "wss://ogs-liveserv-mt.nyxop.net/websock",
                retries: "10",
                cooldownSeconds: "300",
                maxRetryDelaySeconds: "60"
              },
              ogsClient: {
                enabled: "true",
                url: "https://ogs-client-api-mt.nyxop.net",
              },

            }
        },
        "963": {
            "desktop": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ppb/html/client-adapter.html",
              operatorPostMsgLibrary: "https://ogs-gcm-eu-prod.nyxop.net/gcm/gcm-launcher/lib/ppw/ppbPostMsgLib.js",
            },
            "mobile": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ppb/html/client-adapter.html",
              operatorPostMsgLibrary: "https://ogs-gcm-eu-prod.nyxop.net/gcm/gcm-launcher/lib/ppw/ppbPostMsgLib.js",
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },

            }
        },
        "718": {
            "desktop": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/desktop-commonui/commonui.html",
            },
            "mobile": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/mobile-commonui/commonui.html",
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },
              gamesparks: {
                enabled: false,
              },
              jackpotQuery: {
                jqUrl: "https://jackpot-query-gi.nyxop.net/v3/jackpots",
                interval: "1000",
              },

            }
        },
        "555": {
            "desktop": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/desktop-commonui/commonui.html",
            },
            "mobile": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ogs/mobile-commonui/commonui.html",
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },
              gamesparks: {
                enabled: true,
                mode: "live",
                apiKey: "n386858yASCN",
                credential: "device",
                gsUrl: "https://gam-registration-mt.nyxop.net/gs-registration"
              },
              jackpotQuery: {
                jqUrl: "https://jackpot-query-mt.nyxop.net/v3/jackpots",
                interval: "1000",
              },
              liveserv: {
                enabled: "true",
                url: "wss://ogs-liveserv-mt.nyxop.net/websock",
                retries: "10",
                cooldownSeconds: "300",
                maxRetryDelaySeconds: "60"
              },
              ogsClient: {
                enabled: "true",
                url: "https://ogs-client-api-mt.nyxop.net",
              },

            }
        },
        "980": {
            "desktop": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ppb/html/client-adapter.html",
              operatorPostMsgLibrary: "https://ogs-gcm-eu-prod.nyxop.net/gcm/gcm-launcher/lib/ppw/ppbPostMsgLib.js",
            },
            "mobile": {
              commonUIUrl: "https://ogs-gcm-eu-prod.nyxop.net/ppb/html/client-adapter.html",
              operatorPostMsgLibrary: "https://ogs-gcm-eu-prod.nyxop.net/gcm/gcm-launcher/lib/ppw/ppbPostMsgLib.js",
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },

            }
        },
    };


    var _hasOperatorSpecificProperty = function(operator_id) {
        return _operator_Properties[operator_id] !== undefined;
    };

    var _hasDeviceSpecificProperty = function(operator_id, device, propertyName) {
        return _operator_Properties[operator_id][device] !== undefined && _operator_Properties[operator_id][device][propertyName];
    };

    var _getOperatorSpecificProperty = function(propertyName, operator_id, device) {

        if(operator_id == undefined || !_hasOperatorSpecificProperty(operator_id)) {
            operator_id = "default";
        }

        if(device == undefined || !_hasDeviceSpecificProperty(operator_id, device, propertyName)) {
            device = "default";
        }

        if(propertyName == undefined) {
            console.log("Error: getOperatorSpecificProperty: property name is undefined");
            return;
        } else {
            return _operator_Properties[operator_id][device][propertyName];
        }
    };

    var _getCMAScriptUrl = function(host_name,operator_id, device) {

        var scriptUrl = _getOperatorSpecificProperty('scriptUrl', operator_id, device);
        var containerUrls = _getOperatorSpecificProperty('containerUrls', operator_id, device);
        if(scriptUrl && containerUrls && containerUrls[host_name]) {
            return scriptUrl + "?containerUrl=" +  containerUrls[host_name];
        } else {
            console.log("Error: getCMAScriptUrl: Either scriptUrl or containerUrl is missing");
            return;
        }
    };

    var _gcmServiceConfiguration = {
        "liveserv": {
            "Enabled": false
        },
        "analytics": {
            "Enabled": false,
            "Parameters": {
                "trackingid": "1234567",
                "samplerate": "100"
            }
        },
        "gameoption": {
            "Enabled": true,
            "Parameters": {
                "MUTE": false
            }
        }
    };

    var _getGCMServiceConfiguration = function () {
        return _gcmServiceConfiguration;
    };

    return {
        gameProviderHostNameList: _gameProviderHostNameList,
        getOperatorSpecificProperty: _getOperatorSpecificProperty,
        getGCMServiceConfiguration: _getGCMServiceConfiguration,
        getCMAScriptUrl: _getCMAScriptUrl
    };
})();
