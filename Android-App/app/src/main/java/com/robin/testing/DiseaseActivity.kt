package com.robin.testing

import android.graphics.Color
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.util.Log
import com.github.mikephil.charting.data.PieData
import com.github.mikephil.charting.data.PieDataSet
import com.github.mikephil.charting.data.PieEntry
import com.google.gson.Gson
import kotlinx.android.synthetic.main.activity_disease.*

class DiseaseActivity : AppCompatActivity() {

    val gson = Gson()

    class Disease
    {
        lateinit var values: ArrayList<String>
    }
    class Percentage
    {
        lateinit var values:ArrayList<Float>
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_disease)

        val disease = intent.getStringExtra("Diseases")
        val percentage = intent.getStringExtra("Percentage")

        Log.d("Disease",disease)
        Log.d("Percentage",percentage)

        val pieData = ArrayList<PieEntry>()
        var stringDisease = ""
        val diseaseProbability = gson.fromJson(percentage,Percentage::class.java).values
        var a = 0
        gson.fromJson(disease,Disease::class.java).values.forEach {
            val dis = "${it.substring(0,1).toUpperCase()}${it.substring(1)}"
            stringDisease += "• $dis\n"
            pieData.add(PieEntry(diseaseProbability[a++],dis))
        }
        diseaseTextView.text = stringDisease
        val dataSet = PieDataSet(pieData,"Diseases")
        val coloursList = ArrayList<Int>()
        coloursList.add(Color.parseColor("#EF5350"))
        coloursList.add(Color.parseColor("#3F51B5"))
        coloursList.add(Color.parseColor("#4CA047"))
        dataSet.colors = coloursList
        chart.data = PieData(dataSet)
        chart.holeRadius = 0F
        chart.setTransparentCircleAlpha(0)
        chart.setTransparentCircleColor(Color.parseColor("#102139"))
        chart.invalidate()


    }
}
