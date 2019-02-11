package com.robin.testing

import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.support.v7.app.AppCompatActivity
import android.text.Html
import android.view.animation.AnimationUtils
import kotlinx.android.synthetic.main.activity_splash.*

class SplashActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_splash)

        appTextView.text = Html.fromHtml("Docto<sup>+</sup>")
        val animation = AnimationUtils.loadAnimation(this, R.anim.splash_animation)
        appTextView.startAnimation(animation)
        splash_image.startAnimation(animation)
        val intent = Intent(this, MainActivity::class.java)
        val runnable = Runnable {
            startActivity(intent)
        }
        Handler().postDelayed(runnable, 2000)
    }
}
