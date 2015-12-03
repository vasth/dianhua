package com.dian400.react.easemob;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.util.Log;
import android.widget.Toast;

import com.easemob.EMCallBack;
import com.easemob.EMError;
import com.easemob.chat.EMCallStateChangeListener;
import com.easemob.chat.EMChatManager;
import com.easemob.exceptions.EMNetworkUnconnectedException;
import com.easemob.exceptions.EMNoActiveCallException;
import com.easemob.exceptions.EMServiceNotReadyException;
import com.easemob.exceptions.EaseMobException;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

/**
 * Created by Administrator on 15-11-4.
 */
public class Commonim {

    private ReactContext mReactContext;
    private WritableMap params = Arguments.createMap();
    public Commonim(ReactContext reactContext) {
        mReactContext = reactContext;
    }
    //发送参数到js端
    private void sendEvent(String eventName, WritableMap params) {
        Log.i("RNEasemobModule","sendEvent");
        Log.i("RNEasemobModule", params.toString());
        if (mReactContext != null) {
            mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(eventName, params);
        }else{
            Log.i("RNEasemobModule","mReactContext is null");
        }
    }

    //判断用户是否已经登录
//    public bool islogin(){
//
//    }

    //注册设备用户
    public void Create(final Context context, final String username, final String pwd){

        new Thread(new Runnable() {
            public void run() {
                try {
                    // 调用sdk注册方法
                    EMChatManager.getInstance().createAccountOnServer(username, pwd);
                    params.putString("create_err", "nil");
                } catch (final EaseMobException e) {
                    //注册失败
                    int errorCode=e.getErrorCode();
                    if(errorCode== EMError.NONETWORK_ERROR){
                        params.putString("create_err", "NONETWORK_ERROR");
                       // Toast.makeText(context, "网络异常，请检查网络！", Toast.LENGTH_SHORT).show();
                    }else if(errorCode==EMError.USER_ALREADY_EXISTS){
                        params.putString("create_err", "USER_ALREADY_EXISTS");
                        //Toast.makeText(context, "用户已存在！", Toast.LENGTH_SHORT).show();
                    }else if(errorCode==EMError.UNAUTHORIZED){
                        params.putString("create_err", "UNAUTHORIZED");
                       // Toast.makeText(context, "注册失败，无权限！", Toast.LENGTH_SHORT).show();
                    }else{
                        params.putString("create_err", e.getMessage());
                       // Toast.makeText(context, "注册失败: " + e.getMessage(), Toast.LENGTH_SHORT).show();
                    }
                }
                sendEvent("RNEasemobEvent", params);
             }
        }).start();

    }

    //登录设备用户
    public void Login(final Context context, final String username, final String pwd){
        EMChatManager.getInstance().login(username,pwd,new EMCallBack() {//回调
            public void onSuccess() {
                params.putString("login_err", "success");
                  Log.d("main", "登陆聊天服务器成功！");
                sendEvent("RNEasemobEvent", params);
            }
            public void onProgress(int progress, String status) {

            }
            public void onError(int code, String message) {
                params.putString("login_err", message);
                Log.d("main", "登陆聊天服务器失败！");
                sendEvent("RNEasemobEvent", params);
            }
        });

    }

    //注册实时通话监听
    public void Initim(Context context) {
        Log.d("RNEasemob", "Initim");
        IntentFilter callFilter = new IntentFilter(EMChatManager.getInstance().getIncomingCallBroadcastAction());
        context.registerReceiver(new CallReceiver(), callFilter);
    }




    private class CallReceiver extends BroadcastReceiver {

        @Override
        public void onReceive(Context context, Intent intent) {
            Log.d("RNEasemobCall","onReceive");
            // 拨打方username
            String from = intent.getStringExtra("from");
            Log.d("RNEasemobfrom",from);
            // call type
            String type = intent.getStringExtra("type");
            if("video".equals(type)){ //视频通话--暂时不做
//                context.startActivity(new Intent(context, VideoCallActivity.class).
//                        putExtra("username", from).putExtra("isComingCall", true).
//                        addFlags(Intent.FLAG_ACTIVITY_NEW_TASK));
            }else{ //音频通话
                context.startActivity(new Intent(context, VoiceCallActivity.class).
                        putExtra("username", from).putExtra("isComingCall", true).
                        addFlags(Intent.FLAG_ACTIVITY_NEW_TASK));
            }
            Log.d("RNEasemobtype", type);
            //params.putString("callreceiver", from);
            Log.d("main", "登陆聊天服务器失败！");
            //sendEvent("RNEasemobEvent", params);
        }
    }

    public void Call(Context context, String username){
        /**
         * 拨打语音通话
         * @param to
         * @throws EMServiceNotReadyException
         */
        Log.d("RNEasemobCall",username);
        context.startActivity(new Intent(context, VoiceCallActivity.class).putExtra("username",
                username).putExtra("isComingCall", false).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK));
//        try {
//
//           // EMChatManager.getInstance().makeVoiceCall(username);
//        } catch (EMServiceNotReadyException e) {
//            // TODO Auto-generated catch block
//            e.printStackTrace();
//        }
    }

    public void Answer() {
        /**
         * 接听通话
         * @throws EMNoActiveCallException
         * @throws EMNetworkUnconnectedException
         */
        try {
            EMChatManager.getInstance().answerCall();
        } catch (EMNoActiveCallException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (EMNetworkUnconnectedException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    public void Reject() {
        /**
         * 拒绝接听
         * @throws EMNoActiveCallException
         */
        try {
            EMChatManager.getInstance().rejectCall();
        } catch (EMNoActiveCallException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
    public void endCall() {
        /**
         * 挂断通话
         */
        EMChatManager.getInstance().endCall();
    }

    public void StateChangeListener(Context context) {
        /**
         * 设置通话状态监听
         * @param listener
         */
        EMChatManager.getInstance().addVoiceCallStateChangeListener(new EMCallStateChangeListener() {
            @Override
            public void onCallStateChanged(CallState callState, CallError error) {
                switch (callState) {
                    case CONNECTING: // 正在连接对方

                        break;
                    case CONNECTED: // 双方已经建立连接

                        break;

                    case ACCEPTED: // 电话接通成功

                        break;
                    case DISCONNNECTED: // 电话断了

                        break;

                    default:
                        break;
                }

            }
        });
    }
}
