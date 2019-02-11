package com.robin.testing

import android.content.Intent
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    lateinit var name:String
    var age = 0
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        submitDetails.setOnClickListener {
            if(validateName() and validateAge()) {
                val intent = Intent(this, SymptomsActivity::class.java)
                intent.putExtra("Name", name)
                intent.putExtra("Age", age)
                if (genderRadioGroup.checkedRadioButtonId == R.id.maleRb)
                    intent.putExtra("Gender", "Male")
                else
                    intent.putExtra("Gender", "Female")
                startActivity(intent)
            }
        }
    }

    private fun validateAge():Boolean
    {
        val ageString = ageTextInputLayout.editText!!.text.toString()
        if(ageString.length == 0)
        {
            ageTextInputLayout.error = "Field Cant be Empty"
            return false
        }
        age = ageString.toInt()
        ageTextInputLayout.error = null
        return true
    }

    private fun validateName():Boolean
    {
        name = nameTextInputLayout.editText!!.text.toString().trim()
        if(name.length == 0)
        {
            nameTextInputLayout.error = "Field Cant be Empty"
            return false
        }
        nameTextInputLayout.error = null
        return true
    }

}
