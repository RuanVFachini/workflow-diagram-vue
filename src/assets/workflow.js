const json = {
    actionName: "busca-ids-integracao",
    actionType: "br.com.senior.plutaoapp.workflow.actions.ExecuteQueryDatabaseAction",
    nextAction: {
        actionName: "possui-busca-ids-integracao",
            actionType: "br.com.senior.plutaoapp.workflow.actions.IfAction",
                nextAction: {
            actionName: "buscar-cargos",
                actionType: "br.com.senior.plutaoapp.workflow.actions.ExecuteQueryDatabaseAction",
                    nextAction: {
                actionName: "loop-de-integracao",
                    actionType: "br.com.senior.plutaoapp.workflow.actions.ForAction",
                        nextAction: {
                    actionName: "loop-de-atualizar-pendencias",
                        actionType: "br.com.senior.plutaoapp.workflow.actions.ForAction",
                            nextAction: null,
                                "listObjectName": "busca-ids-integracao",
                                    "alternativeAction": {
                        actionName: "update-pendencia-cargo",
                            actionType: "br.com.senior.plutaoapp.workflow.actions.ExecuteTransactionQueryDatabaseAction",
                                nextAction: null,
                                    "tenant": "TESTE151-INTEGRACOES_GESTAO_PESSOAS",
                                        "query": "insert into RTC_PEND_KONVIVA(ID) values(#loop-de-atualizar-pendencias.ID#)"
                    }
                },
                "listObjectName": "buscar-cargos",
                    "alternativeAction": {
                    actionName: "cria-json-body",
                        actionType: "br.com.senior.plutaoapp.workflow.actions.ConvertMapStringObjectToJsonStringAction",
                            nextAction: {
                        actionName: "verifica-dePara",
                            actionType: "br.com.senior.plutaoapp.workflow.actions.FromToAction",
                                nextAction: {
                            actionName: "atualiza-se-existe-dePara",
                                actionType: "br.com.senior.plutaoapp.workflow.actions.IfAction",
                                    nextAction: {
                                actionName: "busca-cargos-ws",
                                    actionType: "br.com.senior.plutaoapp.workflow.actions.WebServiceRestAction",
                                        nextAction: {
                                    actionName: "decode-json-response",
                                        actionType: "br.com.senior.plutaoapp.workflow.actions.ConvertJsonStringToJsonObjectAction",
                                            nextAction: {
                                        actionName: "insere-se-nao-existe",
                                            actionType: "br.com.senior.plutaoapp.workflow.actions.IfAction",
                                                nextAction: {
                                            actionName: "update-cargo-ws",
                                                actionType: "br.com.senior.plutaoapp.workflow.actions.WebServiceRestAction",
                                                    nextAction: null,
                                                        "wsUrl": "http://senior.homol.konviva.com.br/action/api/integrarCargo",
                                                            "wsMethod": "PUT",
                                                                "wsAuthenticationType": "Bearer",
                                                                    "wsAuthenticationToken": "KONVIVA 02982d594db02af067182d9adb8d51a3",
                                                                        "wsAuthenticationBean": null,
                                                                            "credentialName": null,
                                                                                "returnEncoding": null,
                                                                                    "content": "#cria-json-body#"
                                        },
                                        "condition": "get(\"decode-json-response\").containsKey(\"IDCargo\")",
                                            "alternativeAction": {
                                            actionName: "insere-cargo-ws",
                                                actionType: "br.com.senior.plutaoapp.workflow.actions.WebServiceRestAction",
                                                    nextAction: null,
                                                        "wsUrl": "http://senior.homol.konviva.com.br/action/api/integrarCargo",
                                                            "wsMethod": "POST",
                                                                "wsAuthenticationType": "Bearer",
                                                                    "wsAuthenticationToken": "KONVIVA 02982d594db02af067182d9adb8d51a3",
                                                                        "wsAuthenticationBean": null,
                                                                            "credentialName": null,
                                                                                "returnEncoding": null,
                                                                                    "content": "#cria-json-body#"
                                        }
                                    },
                                    "sourceObject": "busca-cargos-ws"
                                },
                                "wsUrl": "http://senior.homol.konviva.com.br/action/api/getCargo/#loop-de-integracao.CODCargo#",
                                    "wsMethod": "GET",
                                        "wsAuthenticationType": "Bearer",
                                            "wsAuthenticationToken": "KONVIVA 02982d594db02af067182d9adb8d51a3",
                                                "wsAuthenticationBean": null,
                                                    "credentialName": null,
                                                        "returnEncoding": null,
                                                            "content": null
                            },
                            "condition": "get(\"verifica-dePara\") == null",
                                "alternativeAction": {
                                actionName: "avanca-para-update",
                                    actionType: "br.com.senior.plutaoapp.workflow.actions.GoToAction",
                                        nextAction: null,
                                            "sourceObject": "update-cargo-ws"
                            }
                        },
                        "collection": "CARGOS",
                            "from": "#loop-de-integracao.CODCargo#"
                    },
                    "sourceObject": "loop-de-integracao",
                        "processInsideNodes": true
                }
            },
            "tenant": "TESTE151-INTEGRACOES_GESTAO_PESSOAS",
                "query": "SELECT\n\tCONCAT(R024CAR.EstCar, R024CAR.CodCar) AS \"CODCargo\",\n\tR024CAR.TitCar AS \"NomeCargo\",\n\tNULL AS \"DescricaoCargo\"\nFROM\n\tRTC_PENDENCIES\nLEFT JOIN R024CAR ON\n\tR024CAR.CODCAR = json_value(RTC_PENDENCIES.RECORDKEY,'$.CodCar')\n\tAND R024CAR.ESTCAR = json_value(RTC_PENDENCIES.RECORDKEY,'$.EstCar')\nWHERE\n\tRTC_PENDENCIES.TABLENAME = 'R024CAR'\n\tAND NOT EXISTS (\n\tSELECT\n\t\t1\n\tFROM\n\t\tRTC_PEND_KONVIVA\n\tWHERE\n\t\tRTC_PEND_KONVIVA.ID = RTC_PENDENCIES.ID)"
        },
        "condition": "get(\"busca-ids-integracao\").size() > 0",
            "alternativeAction": null
    },
    "tenant": "TESTE151-INTEGRACOES_GESTAO_PESSOAS",
        "query": "SELECT \nID FROM\n\tRTC_PENDENCIES\nWHERE\n\tRTC_PENDENCIES.TABLENAME = 'R024CAR'\tAND NOT EXISTS (SELECT 1 FROM RTC_PEND_KONVIVA WHERE RTC_PEND_KONVIVA.ID = RTC_PENDENCIES.ID)"
}

export default json