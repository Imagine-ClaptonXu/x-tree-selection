const mockData = [
    {
        "code": "1",
        "name": "最外层 1",
        "menuType": 1,
        "children": [
            {
                "code": "1-1",
                "name": "2 层 1-1",
                "menuType": 2,
                "children": [
                    {
                        "code": "1-1-1",
                        "name": "3 层 1-1-1",
                        "menuType": 3,
                        "children": [
                            {
                                "code": "1-1-1-1",
                                "name": "4 层 1-1-1-1",
                                "menuType": 4,
                                "children": [
                                    {
                                        "code": "1-1-1-1-1",
                                        "name": "5 层 1-1-1-1-1",
                                        "menuType": 5,
                                        "children": [
                                            {
                                                "code": "1-1-1-1-1-1",
                                                "name": "6 层 1-1-1-1-1-1",
                                                "menuType": 6,
                                                "children": []
                                            },
                                            {
                                                "code": "1-1-1-1-1-2",
                                                "name": "6 层 1-1-1-1-1-2",
                                                "menuType": 6,
                                                "children": []
                                            },
                                        ]
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        "code": "1-1-2",
                        "name": "3 层 1-1-2 英文大写 QWEFDGFD",
                        "menuType": 3,
                        "children": []
                    },
                    {
                        "code": "1-1-3",
                        "name": "3 层 1-1-3 英文小写 qwefghgf",
                        "menuType": 3,
                        "children": []
                    }
                ]
            },
            {
                "code": "1-2",
                "name": "2 层 1-2",
                "menuType": 2,
                "children": [
                    {
                        "code": "1-2-1",
                        "name": "3 层 1-2-1 英文大小写 FGFdsaDSdasDsaj",
                        "menuType": 3,
                        "children": []
                    },
                    {
                        "code": "1-2-2",
                        "name": "3 层 1-2-2 英文大小写 dadsFSDFasdsadx",
                        "menuType": 3,
                        "children": []
                    },
                    {
                        "code": "1-2-3",
                        "name": "3 层 1-2-3 英文大小写 gfhertSFSD",
                        "menuType": 3,
                        "children": []
                    },
                    {
                        "code": "1-2-4",
                        "name": "3 层 1-2-4",
                        "menuType": 3,
                        "children": []
                    },
                ]
            },
            {
                "code": "1-3",
                "name": "2 层 1-3",
                "menuType": 2,
                "children": [
                    {
                        "code": "1-3-1",
                        "name": "3 层 1-3-1",
                        "menuType": 3,
                        "children": []
                    },
                    {
                        "code": "1-3-2",
                        "name": "3 层 1-3-2 英文大小写 tyrsSDFDSFWQEqasd",
                        "menuType": 3,
                        "children": []
                    }
                ]
            },
            {
                "code": "1-4",
                "name": "2 层 1-4",
                "menuType": 2,
                "children": [
                    {
                        "code": "1-4-1",
                        "name": "3 层 1-4-1",
                        "menuType": 3,
                        "children": []
                    },
                    {
                        "code": "1-4-2",
                        "name": "3 层 1-4-2",
                        "menuType": 3,
                        "children": []
                    }
                ]
            },
        ]
    },
    {
        "code": "2",
        "name": "最外层 2",
        "menuType": 1,
        "children": [
            {
                "code": "2-1",
                "name": "2 层 2-1",
                "menuType": 2,
                "children": [
                    {
                        "code": "2-1-1",
                        "name": "3 层 2-1-1 英文大小写 dfsdQEDASDSAqwe",
                        "menuType": 3,
                        "children": [
                            {
                                "code": "2-1-1-1",
                                "name": "4 层 2-1-1-1",
                                "menuType": 4,
                                "children": [
                                    {
                                        "code": "2-1-1-1-1",
                                        "name": "5 层 2-1-1-1-1",
                                        "menuType": 5,
                                        "children": []
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        "code": "2-1-2",
                        "name": "3 层 2-1-2",
                        "menuType": 3,
                        "children": []
                    },
                    {
                        "code": "2-1-3",
                        "name": "3 层 2-1-3",
                        "menuType": 3,
                        "children": []
                    }
                ]
            },
            {
                "code": "2-2",
                "name": "2 层 2-2",
                "menuType": 2,
                "children": [
                    {
                        "code": "2-2-1",
                        "name": "3 层 2-2-1",
                        "menuType": 3,
                        "children": []
                    },
                    {
                        "code": "2-2-2",
                        "name": "3 层 2-2-2",
                        "menuType": 3,
                        "children": []
                    },
                    {
                        "code": "2-2-3",
                        "name": "3 层 2-2-3 英文大小写 dasdaGDFGcxzcdfssafsd",
                        "menuType": 3,
                        "children": []
                    },
                    {
                        "code": "2-2-4",
                        "name": "3 层 2-2-4  英文大小写 hguetrzcxbsrqwdas",
                        "menuType": 3,
                        "children": []
                    },
                ]
            },
            {
                "code": "2-3",
                "name": "2 层 2-3",
                "menuType": 2,
                "children": [
                    {
                        "code": "2-3-1",
                        "name": "3 层 2-3-1",
                        "menuType": 3,
                        "children": []
                    },
                    {
                        "code": "2-3-2",
                        "name": "3 层 2-3-2",
                        "menuType": 3,
                        "children": []
                    }
                ]
            },
            {
                "code": "2-4",
                "name": "2 层 2-4",
                "menuType": 2,
                "children": [
                    {
                        "code": "2-4-1",
                        "name": "3 层 2-4-1",
                        "menuType": 3,
                        "children": []
                    },
                    {
                        "code": "2-4-2",
                        "name": "3 层 2-4-2",
                        "menuType": 3,
                        "children": []
                    }
                ]
            },
        ]
    },
    {
        "code": "3",
        "name": "最外层 3",
        "menuType": 1,
        "children": [
            {
                "code": "3-1",
                "name": "2 层 3-1",
                "menuType": 2,
                "children": [
                    {
                        "code": "3-1-1",
                        "name": "3 层 3-1-1",
                        "menuType": 3,
                        "children": []
                    }
                ]
            },
        ],
    },
]


export {
    mockData,
}
