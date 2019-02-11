package com.robin.testing

import android.app.AlertDialog
import android.app.ProgressDialog
import android.content.Intent
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.support.v7.widget.SearchView
import android.util.Log
import android.view.Menu
import android.view.MenuItem
import android.widget.Toast
import com.android.volley.DefaultRetryPolicy
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import com.google.gson.Gson
import kotlinx.android.synthetic.main.activity_symptoms.*
import org.json.JSONObject
import java.util.*


class SymptomsActivity : AppCompatActivity() {

    private lateinit var adapter:SymptomsListAdapter
    private lateinit var symptomsList:MutableList<String>
    private lateinit var showList:ArrayList<String>
    private lateinit var progressDialog:ProgressDialog
    private val gson = Gson()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_symptoms)

        progressDialog = ProgressDialog(this)
        progressDialog.setTitle("Diagnosing")
        progressDialog.setMessage("Please Wait...")
        progressDialog.setCancelable(false)

        symptomsList = Arrays.asList("charleyhorse","chest tightness","orthostasis","lethargy","nonsmoker","lameness","prostate tender","immobile","frothy sputum","mass in breast","dyspareunia","nightmare","fremitus","lightheadedness","feeling hopeless","hemiplegia","welt","pain","colic abdominal","fecaluria","shortness of breath","satiety early","feels hot/feverish","hot flush","emphysematous change","snuffle","hyperkalemia","sniffle","wheezing","food intolerance","pain in lower limb","abnormally hard consistency","side pain","heme positive","catatonia","gurgle","heavy legs","unresponsiveness","bowel sounds decreased","overweight","stridor","sweat","fever","malaise","decreased stool caliber","barking cough","tinnitus","hematocrit decreased","pain chest","abdominal bloating","tonic seizures","headache","tremor resting","rigor temperature-associated observation","jugular venous distention","sciatica","stool color yellow","hematuria","awakening early","incoherent","urinoma","non-productive cough","tumor cell invasion","pressure chest","coordination abnormal","enuresis","pleuritic pain","spasm","excruciating pain","breath-holding spell","cushingoid habitus","breath sounds decreased","ecchymosis","hydropneumothorax","gravida 10","fatigue","suicidal","pericardial friction rub","intoxication","difficulty","drool","ataxia","cystic lesion","feeling strange","guaiac positive","flushing","pain back","st segment depression","para 1","previous pregnancies 2","cyanosis","Heberden\'s node","nasal flaring","poor feeding","transsexual","low back pain","hypercapnia","rambling speech","bruit","bradycardia","macule","rest pain","hepatosplenomegaly","monoclonal","neologism","pansystolic murmur","moan","retch","oliguria","hypocalcemia result","myalgia","shooting pain","frail","hyperhidrosis disorder","unconscious state","chill","projectile vomiting","dyspnea on exertion","seizure","myoclonus","cough","mass of body structure","scar tissue","hoarseness","vision blurred","hypersomnolence","urge incontinence","hypotension","general unsteadiness","history of blackout","sedentary","hallucinations visual","tremor","heavy feeling","hemianopsia homonymous","stiffness","stinging sensation","systolic murmur","choke","pulsus paradoxus","burning sensation","photophobia","phonophobia","disequilibrium","constipation","pustule","cardiovascular event","behavior showing increased motor activity","asthenia","milky","bedridden","thicken","hemodynamically stable","rolling of eyes","sputum purulent","swelling","green sputum","weepiness","indifferent mood","no known drug allergies","hypometabolism","clonus","gravida 0","pneumatouria","numbness of hand","clammy skin","paresis","heartburn","withdraw","posturing","uncoordination","speech slurred","abdominal tenderness","paresthesia","rhd positive","poor dentition","underweight","hypesthesia","adverse reaction","loose associations","nasal discharge present","blanch","hyperemesis","hacking cough","cushingoid facies","elation","dysuria","macerated skin","decreased body weight","hunger","rhonchus","fall","distress respiratory","haemoptysis","patient non compliance","pain neck","sneeze","hyperacusis","abdomen acute","pin-point pupils","hirsutism","Murphy\'s sign","worry","stuffy nose","air fluid level","inappropriate affect","feeling suicidal","debilitation","angina pectoris","rale","hypotonic","productive cough","nausea","catching breath","qt interval prolonged","palpitation","aphagia","alcohol binge episode","systolic ejection murmur","proteinemia","throbbing sensation quality","fear of falling","numbness","tachypnea","superimposition","tired","yellow sputum","facial paresis","verbally abusive behavior","hypokalemia","muscle hypotonia","irritable mood","extrapyramidal sign","noisy respiration","breakthrough pain","pain foot","syncope","presence of q wave","sinus rhythm","aura","dullness","difficulty passing urine","wheelchair bound","no status change","redness","para 2","blackout","terrify","nervousness","renal angle tenderness","egophony","abscess bacterial","panic","dyspnea","mediastinal shift","urgency of micturition","polyuria","disturbed family","drowsiness","room spinning","pallor","flare","transaminitis","hallucinations auditory","paralyse","hypertonicity","diarrhea","spontaneous rupture of membranes","sensory discomfort","hypoxemia","groggy","throat sore","flatulence","cardiovascular finding","pulse absent","consciousness clear","t wave inverted","atypia","out of breath","sleepy","titubation","mood depressed","verbal auditory hallucinations","dizzy spells","pruritus","estrogen use","large-for-dates fetus","dizziness","slowing of urinary stream","decreased translucency","decompensation","hypokinesia","arthralgia","scratch marks","hyperventilation","formication","posterior rhinorrhea","left atrial hypertrophy","dysarthria","fatigability","night sweat","homelessness","hypoalbuminemia","polydypsia","hoard","achalasia","symptom aggravating factors","ascites","hyponatremia","scleral icterus","tenesmus","st segment elevation","has religious belief","metastatic lesion","hematochezia","clumsiness","red blotches","energy increased","hypersomnia","gasping for breath","symptom","nausea and vomiting","moody","haemorrhage","cicatrisation","breech presentation","focal seizures","stupor","impaired cognition","motor retardation","apyrexial","lip smacking","painful swallowing","agitation","lung nodule","alcoholic withdrawal symptoms","vertigo","soft tissue swelling","weight gain","dysesthesia","photopsia","giddy mood","general discomfort","chest discomfort","erythema","abnormal sensation","cardiomegaly","polymyalgia","retropulsion","pain abdominal","anosmia","behavior hyperactive","unable to concentrate","hepatomegaly","rapid shallow breathing","asterixis","abortion","todd paralysis","prodrome","mental status changes","monocytosis","r wave feature","vomiting","anorexia","adverse effect","Stahli\'s line","sore to touch","ambidexterity","primigravida","neck stiffness","ache","labored breathing","unhappy","absences finding","exhaustion","lesion","cachexia","bleeding of vagina","claudication","extreme exhaustion","distended abdomen","splenomegaly","gag","passed stones","dysdiadochokinesia","unsteady gait","bradykinesia","sweating increased","hypoproteinemia","paraparesis","regurgitates after swallowing","floppy","orthopnea","homicidal thoughts","intermenstrual heavy bleeding","urinary hesitation","prostatism","mydriasis","unwell","muscle twitch","snore","sleeplessness","hypothermia,natural","feces in rectum","asymptomatic")
        Collections.sort(symptomsList,String.CASE_INSENSITIVE_ORDER)
        showList = ArrayList<String>()
        showList.addAll(symptomsList)

        val personDetails = PersonDetails(intent!!.extras!!.getString("Name")!!,intent!!.extras!!.getInt("Age"),intent!!.extras!!.getString("Gender")!!)

        adapter = SymptomsListAdapter(this,showList)
        symptoms_listView.adapter = adapter

        symptoms_listView.setOnItemClickListener { parent, view, position, id ->
            if(adapter.selectedSymptoms.contains(showList[position]))
                adapter.selectedSymptoms.remove(showList[position])
            else
                adapter.selectedSymptoms.add(showList[position])
            adapter.notifyDataSetChanged()
        }

        val url = "http://192.168.43.86:8081/diagnose"

        val volleyQueue = Volley.newRequestQueue(this)

        checkDisease.setOnClickListener {
            personDetails.symptoms.clear()
            if(adapter.selectedSymptoms.size < 4)
                Toast.makeText(this,"Please Select Atleast 4 Symptoms",Toast.LENGTH_SHORT).show()
            else {
                personDetails.symptoms.addAll(adapter.selectedSymptoms)
                for(i in 0 until personDetails.symptoms.size)
                    personDetails.symptoms[i] = personDetails.symptoms[i].replace(" ","_")
                var symptoms = ""
                var a = 1
                adapter.selectedSymptoms.forEach {
                    symptoms += "${a++}. $it\n"
                }
                AlertDialog.Builder(this).setTitle("Selected Symptoms")
                    .setMessage("Are You Sure to Proceed With Selected Symptoms :\n\n$symptoms").setCancelable(false)
                    .setPositiveButton("Yes") { dialog, which ->
                        progressDialog.show()
                        val jsonDetails = gson.toJson(personDetails)

                        Log.d("JSON DATA",jsonDetails)
                        val json = JSONObject(jsonDetails)

                        val getRequest = JsonObjectRequest(Request.Method.POST,url, json, Response.Listener {
                            val diseases = it.getJSONObject("response").getJSONArray("diseases")
                            val percentage = it.getJSONObject("response").getJSONArray("percentage")
                            val intent = Intent(this,DiseaseActivity::class.java)
                            progressDialog.dismiss()
                            dialog.dismiss()
                            intent.putExtra("Diseases",gson.toJson(diseases))
                            intent.putExtra("Percentage",gson.toJson(percentage))
                            finish()
                            startActivity(intent)
                        }, Response.ErrorListener {
                            progressDialog.dismiss()
                            Toast.makeText(this,"Network Connection Error",Toast.LENGTH_SHORT).show()
                        })
                        getRequest.retryPolicy = DefaultRetryPolicy(
                            0,
                            DefaultRetryPolicy.DEFAULT_MAX_RETRIES,
                            DefaultRetryPolicy.DEFAULT_BACKOFF_MULT
                        )
                        volleyQueue.add(getRequest)
                    }
                    .setNegativeButton("No") { dialog, which ->
                        dialog.dismiss()
                    }
                    .create().show()
            }
        }

        resetSymptoms.setOnClickListener {
            Toast.makeText(this,"Symptoms Cleared",Toast.LENGTH_SHORT).show()
            adapter.selectedSymptoms.clear()
            adapter.notifyDataSetChanged()
        }

    }

    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        menuInflater.inflate(R.menu.menu,menu)
        return super.onCreateOptionsMenu(menu)
    }

    override fun onOptionsItemSelected(item: MenuItem?): Boolean {
        val searchView = item!!.actionView as SearchView
        searchView.setOnQueryTextListener(object : SearchView.OnQueryTextListener{
            override fun onQueryTextSubmit(p0: String?): Boolean {
                return false
            }

            override fun onQueryTextChange(query: String?): Boolean {
                if(query != null)
                    searchSymptom(query)
                return true
            }

        })
        return super.onOptionsItemSelected(item)
    }

    fun searchSymptom(search:String)
    {
        showList.clear()
        symptomsList.forEach {
            if(it.startsWith(search,true))
                showList.add(it)
        }
        adapter.notifyDataSetChanged()
    }

}
