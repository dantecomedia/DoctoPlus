package com.robin.testing

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.CheckBox
import android.widget.TextView

class SymptomsListAdapter(context:Context, symptomsList:ArrayList<String>):ArrayAdapter<String>(context,R.layout.symptoms_listlayout,symptomsList) {

    val selectedSymptoms = ArrayList<String>()
    class ViewHolder
    {
        lateinit var symptomsTextView:TextView
        lateinit var checkBox:CheckBox
    }

    override fun getView(position: Int, convertView: View?, parent: ViewGroup): View {
        var view = convertView
        var viewHolder:ViewHolder
        if(view == null)
        {
            view = LayoutInflater.from(context).inflate(R.layout.symptoms_listlayout,parent,false)
            viewHolder = ViewHolder()
            viewHolder.symptomsTextView = view.findViewById(R.id.symptom_textview)
            viewHolder.checkBox = view.findViewById(R.id.symptom_checkbox)
            view.tag = viewHolder
        }
        viewHolder = view!!.tag as ViewHolder
        //val symptom = getItem(position)!!.substring(0,1).toUpperCase() + getItem(position)!!.substring(1)
        val symptom = getItem(position)!!
        viewHolder.symptomsTextView.text = symptom
        viewHolder.checkBox.isChecked = selectedSymptoms.contains(symptom)
        return view
    }
}