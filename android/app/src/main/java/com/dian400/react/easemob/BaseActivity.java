package com.dian400.react.easemob;

/**
 * Created by Administrator on 15-12-1.
 */
import android.os.Bundle;
import android.support.v4.app.FragmentActivity;
import android.view.View;

public class BaseActivity extends FragmentActivity {

    @Override
    protected void onCreate(Bundle arg0) {
        super.onCreate(arg0);
    }

    @Override
    protected void onResume() {
        super.onResume();
        // onresume时，取消notification显示
        //HXSDKHelper.getInstance().getNotifier().reset();

    }

    @Override
    protected void onStart() {
        super.onStart();
    } 

    /**
     * 返回
     *
     * @param view
     */
    public void back(View view) {
        finish();
    }
}
