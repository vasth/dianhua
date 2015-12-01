package com.dian400.dianhua;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;

import com.dian400.react.geo.Commonloc;
import com.dian400.react.geo.RNBaidulocModule;
import com.facebook.react.LifecycleState;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.facebook.react.shell.MainReactPackage;
import com.dian400.react.MyReactPackage;
import com.facebook.soloader.SoLoader;
import com.learnium.RNDeviceInfo.*;
import com.easemob.chat.EMChat;

public class MainActivity extends Activity implements DefaultHardwareBackBtnHandler {

    private ReactInstanceManager mReactInstanceManager;
    private ReactRootView mReactRootView;
    private Commonloc commonloc;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mReactRootView = new ReactRootView(this);

        mReactInstanceManager = ReactInstanceManager.builder()
                .setApplication(getApplication())
                .setBundleAssetName("index.android.bundle")
                .setJSMainModuleName("index.android")
                .addPackage(new MainReactPackage())
                .addPackage(new MyReactPackage())    //自定义程序包
                .addPackage(new RNDeviceInfo())      //获取设备信息的包 <------ add here
                .setUseDeveloperSupport(BuildConfig.DEBUG)
                        //.setUseDeveloperSupport(false)
                .setInitialLifecycleState(LifecycleState.RESUMED)
                .build();

        mReactRootView.startReactApplication(mReactInstanceManager, "dianhua", null);

        /**开始定位**/
        Log.i("BaiduLocationApiDem", "MainActive-intloc");
        commonloc = new Commonloc(mReactInstanceManager.getCurrentReactContext());
        commonloc.Initloc(getApplicationContext());
        //commonloc.Initloc(getApplicationContext());
        /***/

        /*运行环信服务*/
        EMChat.getInstance().init(getApplicationContext());

        setContentView(mReactRootView);
    }

    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_MENU && mReactInstanceManager != null) {
            mReactInstanceManager.showDevOptionsDialog();
            return true;
        }
        return super.onKeyUp(keyCode, event);
    }

    @Override
    public void onBackPressed() {
        if (mReactInstanceManager != null) {
            mReactInstanceManager.onBackPressed();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public void invokeDefaultOnBackPressed() {
        super.onBackPressed();
    }

    @Override
    protected void onPause() {
        super.onPause();

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onPause();
        }
    }

    @Override
    protected void onResume() {
        super.onResume();

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onResume(this,this);
        }
    }
}