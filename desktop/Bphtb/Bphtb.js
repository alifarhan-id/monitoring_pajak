/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('MyDesktop.Bphtb.Bphtb', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.data.JsonStore',
        'Ext.data.ScriptTagProxy',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer'
    ],

    id:'bphtb',

    init : function(){
        this.launcher = {
            text: 'Monitoring BPHTB',
            iconCls:'icon-grid'
        };
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('bphtb');
        var Record = Ext.data.Record.create([
            {
                name: 'no_sspd'
            },{
                name: 'no_registrasi'
            },{
                name: 'nik'
            },{
                name: 'nama_wp'
            },{
                name: 'alamat_wp'
            },{
                name: 'nop'
            },{
                name: 'alamat_op'
            },{
                name: 'jumlah_setoran'
            },{
                name: 'create_at'
            },{
                name:"user_name"
            }
        ]);
 
        var store = new Ext.data.JsonStore({
            autoLoad: true,
            autoSync: true,
            proxy: new Ext.data.ScriptTagProxy({
                url: 'http://localhost:3000/api/v1/pembayaran'
            }),
            root: 'data',
            totalProperty: 'totalCount',
            fields: Record,
            pageSize :15

        })
        if(!win){
            win = desktop.createWindow({
                id: 'bphtb',
                title:'Monitoring BPHTB Gaess',
                width:740,
                height:480,
                iconCls: 'icon-grid',
                animCollapse:false,
                constrainHeader:true,
                layout: 'fit',
                items: [
                    {
                        border: false,
                        xtype: 'grid',
                        store:store,
                        columns: [
                            new Ext.grid.RowNumberer(),
                            {
                                text: "No Registrasi",
                                flex: 1,
                                sortable: true,
                                dataIndex: 'no_sspd'
                            },
                            {
                                text: "NTPD",
                                width: 70,
                                sortable: true,
                                dataIndex: 'no_registrasi'
                            },
                            {
                                text: "NIK",
                                width: 70,
                                sortable: true,
                                dataIndex: 'nik'
                            },
                            {
                                text: "Wajib Pajak",
                                width: 70,
                                sortable: true,
                                dataIndex: 'nama_wp'
                            },
                            {
                                text: "Alamat Wajib Pajak",
                                width: 70,
                                sortable: true,
                                dataIndex: 'alamat_wp'
                            },
                            {
                                text: "Nop",
                                width: 70,
                                sortable: true,
                                dataIndex: 'nop'
                            },
                            {
                                text: "Alamat Objek Pajak",
                                width: 70,
                                sortable: true,
                                dataIndex: 'alamat_op'
                            },
                            {
                                text: 'Total Bayar',
                                dataIndex: 'jumlah_setoran',
                                renderer: Ext.util.Format.formatNumber,
                                flex: 1
                            },
                            {
                                text: 'Tanggal Bayar',
                                dataIndex: 'create_at',
                                renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                                flex: 1
                            },
                            {
                                text: 'User Kasir',
                                dataIndex: 'user_name',
                                flex: 1
                            },
                        ]
                    }
                ],
                tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Modify options',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                }]
            });
        }
        return win;
    }
});