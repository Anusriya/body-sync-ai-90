<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pain Relief Solutions</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- React and Babel for JSX transpilation -->
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
        body {
            font-family: 'Poppins', sans-serif;
            background-color: #f0f2f5;
        }
        .glass {
            background: rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .gradient-text {
            background: linear-gradient(to right, #ec4899, #8b5cf6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    </style>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel">
        // --- DATA ---
        // I've embedded the JSON data directly into the application.
        const stretchesData = {
          "stretches": [
            { "body_part": "Abdomen", "stretch_name": "Cobra Pose", "description": "Lie on your stomach, hands under your shoulders. Gently press up to lift your chest off the floor, keeping your hips down.", "primary_benefit": "Gently stretches the front abdominal muscles." },
            { "body_part": "Abdomen", "stretch_name": "Cat-Cow Stretch", "description": "Start on hands and knees. Inhale as you drop your belly and look up (Cow). Exhale as you round your spine (Cat).", "primary_benefit": "Gently massages and stretches the core." },
            { "body_part": "Abdomen", "stretch_name": "Standing Side Bend", "description": "Stand with feet hip-width apart. Raise one arm up, then gently bend your torso to the opposite side.", "primary_benefit": "Stretches the side abdominal muscles (obliques)." },
            { "body_part": "Outer Thigh Left", "stretch_name": "Pigeon Pose", "description": "From hands and knees, bring your left knee forward to your left wrist. Extend your right leg straight back. Fold forward if comfortable.", "primary_benefit": "Deeply stretches the hip rotators and glutes." },
            { "body_part": "Outer Thigh Right", "stretch_name": "Pigeon Pose", "description": "From hands and knees, bring your right knee forward to your right wrist. Extend your left leg straight back. Fold forward if comfortable.", "primary_benefit": "Deeply stretches the hip rotators and glutes." },
            { "body_part": "Hips", "stretch_name": "Figure-Four Stretch", "description": "Lie on your back, knees bent. Cross your right ankle over your left knee. Clasp hands behind your left thigh and gently pull it toward you.", "primary_benefit": "Targets the glutes and piriformis muscle." },
            { "body_part": "Inner Thigh Left", "stretch_name": "Butterfly Stretch", "description": "Sit on the floor, bring the soles of your feet together, letting your knees fall out to the sides. Hold onto your ankles and sit up tall.", "primary_benefit": "Excellent for opening the hips and stretching the inner thighs." },
            { "body_part": "Inner Thigh Right", "stretch_name": "Butterfly Stretch", "description": "Sit on the floor, bring the soles of your feet together, letting your knees fall out to the sides. Hold onto your ankles and sit up tall.", "primary_benefit": "Excellent for opening the hips and stretching the inner thighs." },
            { "body_part": "Hips", "stretch_name": "Frog Pose", "description": "Start on hands and knees. Slowly widen your knees out to the sides, keeping ankles in line with your knees. Lower down to your forearms if possible.", "primary_benefit": "A deep and intense stretch for the inner thighs and groin." },
            { "body_part": "Upper Back", "stretch_name": "Thread the Needle", "description": "Start on hands and knees. Slide your right arm under your left arm, resting your right shoulder and head on the floor.", "primary_benefit": "Stretches the muscles between the shoulder blades." },
            { "body_part": "Shoulders", "stretch_name": "Eagle Arms", "description": "Extend arms forward. Cross the right arm over the left at the elbows. Bend elbows and bring palms together. Lift elbows and press hands away.", "primary_benefit": "Provides a deep stretch for the upper back and shoulders." },
            { "body_part": "Lower Back", "stretch_name": "Supine Spinal Twist", "description": "Lie on your back, knees bent. Extend arms to a 'T' shape. Let your knees fall gently to one side while keeping your shoulders on the floor.", "primary_benefit": "Releases tension in the lower back and glutes." },
            { "body_part": "Lower Back", "stretch_name": "Knee-to-Chest Stretch", "description": "Lie on your back. Gently pull one knee, or both knees, into your chest, holding with both hands.", "primary_benefit": "Stretches lower back muscles and relieves compression." },
            { "body_part": "Knees Left", "stretch_name": "Standing Quad Stretch", "description": "Stand, holding a wall for balance. Grab your left foot and gently pull your heel toward your glute, feeling a stretch in the front of your thigh.", "primary_benefit": "Stretches quadriceps; tight quads can cause knee pain." },
            { "body_part": "Knees Right", "stretch_name": "Standing Quad Stretch", "description": "Stand, holding a wall for balance. Grab your right foot and gently pull your heel toward your glute, feeling a stretch in the front of your thigh.", "primary_benefit": "Stretches quadriceps; tight quads can cause knee pain." },
            { "body_part": "Knees Left", "stretch_name": "Seated Hamstring Stretch", "description": "Sit with your left leg extended, right foot against your inner left thigh. Gently fold forward over the straight leg.", "primary_benefit": "Stretches hamstrings; tight hamstrings can affect knee mechanics." },
            { "body_part": "Knees Right", "stretch_name": "Seated Hamstring Stretch", "description": "Sit with your right leg extended, left foot against your inner right thigh. Gently fold forward over the straight leg.", "primary_benefit": "Stretches hamstrings; tight hamstrings can affect knee mechanics." },
            { "body_part": "Neck", "stretch_name": "Ear-to-Shoulder Tilt", "description": "Sit tall. Gently tilt your right ear toward your right shoulder. Repeat on the other side.", "primary_benefit": "Stretches the sides of the neck." },
            { "body_part": "Shoulders", "stretch_name": "Cross-Body Shoulder Stretch", "description": "Bring your right arm across your body. Use your left arm to gently pull the right arm closer to your chest.", "primary_benefit": "Stretches the side and back of the shoulder." },
            { "body_part": "Chest", "stretch_name": "Doorway Stretch", "description": "Stand in a doorway. Place your forearms on the frame. Step forward gently until you feel a stretch across your chest.", "primary_benefit": "Opens up the pectoral muscles." },
            { "body_part": "Arms Left", "stretch_name": "Overhead Triceps Stretch", "description": "Raise your left arm, bend at the elbow, and let your hand fall behind your head. Use your right hand to gently pull the left elbow.", "primary_benefit": "Stretches the back of the upper arm (triceps)." },
            { "body_part": "Arms Right", "stretch_name": "Overhead Triceps Stretch", "description": "Raise your right arm, bend at the elbow, and let your hand fall behind your head. Use your left hand to gently pull the right elbow.", "primary_benefit": "Stretches the back of the upper arm (triceps)." },
            { "body_part": "Hands Left", "stretch_name": "Wrist Extensor/Flexor Stretch", "description": "Extend your left arm, palm down. With your right hand, gently pull your fingers back. Then, point fingers down and gently pull.", "primary_benefit": "Stretches the forearm muscles." },
             { "body_part": "Hands Right", "stretch_name": "Wrist Extensor/Flexor Stretch", "description": "Extend your right arm, palm down. With your left hand, gently pull your fingers back. Then, point fingers down and gently pull.", "primary_benefit": "Stretches the forearm muscles." },
            { "body_part": "Feet Left", "stretch_name": "Plantar Fascia Stretch", "description": "Sit and cross your left leg over the other. Gently pull your toes back toward your shin.", "primary_benefit": "Stretches the sole of the foot to relieve arch pain." },
            { "body_part": "Feet Right", "stretch_name": "Plantar Fascia Stretch", "description": "Sit and cross your right leg over the other. Gently pull your toes back toward your shin.", "primary_benefit": "Stretches the sole of the foot to relieve arch pain." },
            { "body_part": "Head", "stretch_name": "Chin Tuck", "description": "Stand with your back against a wall. Gently draw your chin down and back, making a double chin, while lengthening the back of your neck.", "primary_benefit": "Helps correct forward head posture, reducing headache strain." }
          ]
        };

        const foodsEatData = {
          "foods_for_pain_relief": [
            { "food_category": "Anti-Inflammatory Spices", "specific_foods": ["Turmeric (Haldi)", "Ginger (Adrak)"], "primary_action": "Reduces Inflammation & Cramps", "benefits_areas": ["Abdomen", "Lower Back", "Hips"] },
            { "food_category": "Omega-3 Fatty Acids", "specific_foods": ["Fatty Fish (Salmon, Mackerel)", "Walnuts (Akhrot)", "Flaxseeds (Alsi)"], "primary_action": "Fights Systemic Inflammation", "benefits_areas": ["General Body Aches", "Head"] },
            { "food_category": "Muscle-Soothing Minerals", "specific_foods": ["Bananas", "Dark Chocolate", "Almonds (Badam)", "Spinach (Palak)"], "primary_action": "Relaxes Muscles", "benefits_areas": ["Abdomen", "Lower Back", "Outer Thigh Left", "Outer Thigh Right"] },
            { "food_category": "Hydrating Foods", "specific_foods": ["Water", "Coconut Water", "Cucumber", "Watermelon"], "primary_action": "Reduces Bloating & Headaches", "benefits_areas": ["Abdomen", "Head"] },
            { "food_category": "Iron-Rich Foods", "specific_foods": ["Lentils (Dal)", "Chickpeas (Chana)", "Pomegranate (Anaar)"], "primary_action": "Combats Fatigue & Aches", "benefits_areas": ["General Body", "Head"] }
          ]
        };

        const foodsDontEatData = {
          "foods_that_worsen_pain": [
            { "food_category_to_limit": "High-Sodium Processed Foods", "specific_examples": ["Packaged Chips", "Instant Noodles", "Salted Pickles (Achar)"], "primary_negative_effect": "Increases Bloating", "worsens_pain_in_areas": ["Abdomen", "Hips"] },
            { "food_category_to_limit": "Excess Sugar & Refined Carbs", "specific_examples": ["Sweets (Mithai)", "Pastries", "White Bread"], "primary_negative_effect": "Promotes Inflammation", "worsens_pain_in_areas": ["General Body Aches", "Head"] },
            { "food_category_to_limit": "Excessive Caffeine", "specific_examples": ["Coffee", "Energy Drinks"], "primary_negative_effect": "Increases Tension", "worsens_pain_in_areas": ["Abdomen", "Head", "Chest"] },
            { "food_category_to_limit": "Fried & Fatty Foods", "specific_examples": ["Samosas", "Pakoras", "French Fries"], "primary_negative_effect": "Increases Inflammation", "worsens_pain_in_areas": ["Abdomen", "Left Breast", "Right Breast"] }
          ]
        };

        // --- UI COMPONENTS (Simplified for single-file use) ---
        const { useState, useEffect } = React;

        const Card = ({ children, className = "" }) => <div className={`rounded-xl shadow-md p-4 sm:p-6 ${className}`}>{children}</div>;
        const CardHeader = ({ children }) => <div className="mb-4">{children}</div>;
        const CardTitle = ({ children }) => <h2 className="text-xl font-bold text-gray-800">{children}</h2>;
        const CardContent = ({ children }) => <div>{children}</div>;
        const Button = ({ children, onClick, disabled, className = "" }) => (
            <button onClick={onClick} disabled={disabled} className={`w-full px-4 py-3 rounded-lg font-semibold text-white transition-all duration-300 ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-pink-500 hover:bg-pink-600 shadow-lg hover:shadow-xl'} ${className}`}>
                {children}
            </button>
        );
        const Badge = ({ children, variant, className = "" }) => {
            const baseStyle = "px-2.5 py-1 text-xs font-semibold rounded-full inline-flex items-center";
            const variantStyle = variant === 'secondary' ? "bg-pink-100 text-pink-800" : "bg-gray-100 text-gray-700";
            return <span className={`${baseStyle} ${variantStyle} ${className}`}>{children}</span>
        };
        const Slider = ({ value, onValueChange, max, min, step }) => (
            <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onValueChange([Number(e.target.value)])} className="w-full h-2 bg-pink-100 rounded-lg appearance-none cursor-pointer accent-pink-500" />
        );
        const Label = ({ children, className = "" }) => <label className={`text-sm font-medium text-gray-700 ${className}`}>{children}</label>;
        const X = ({ className, onClick }) => (
            <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        );


        // --- PAIN TRACKER PAGE ---
        const PainTrackerPage = ({ onLogPain }) => {
          const [selectedParts, setSelectedParts] = useState([]);
          const [severity, setSeverity] = useState([5]);
          const [recentLogs, setRecentLogs] = useState([]);

          const bodyAreas = [
            { id: "head", name: "Head", path: "M100 10 C110 10 120 25 120 40 C120 55 110 70 100 70 C90 70 80 55 80 40 C80 25 90 10 100 10 Z" },
            { id: "neck", name: "Neck", path: "M95 70 L105 70 L105 90 L95 90 Z" },
            { id: "shoulders", name: "Shoulders", path: "M70 90 L130 90 L130 110 L70 110 Z" },
            { id: "upper-back", name: "Upper Back", path: "M80 110 L120 110 L120 160 L80 160 Z" },
            { id: "lower-back", name: "Lower Back", path: "M80 160 L120 160 L120 200 L80 200 Z" },
            { id: "chest", name: "Chest", path: "M80 110 L120 110 L120 150 L80 150 Z" },
            { id: "breast-left", name: "Left Breast", path: "M85 115 A 10 10 0 0 0 95 125 A 10 10 0 0 0 85 135 Z" },
            { id: "breast-right", name: "Right Breast", path: "M115 115 A 10 10 0 0 1 105 125 A 10 10 0 0 1 115 135 Z" },
            { id: "abdomen", name: "Abdomen", path: "M80 150 L120 150 L120 200 L80 200 Z" },
            { id: "hips", name: "Hips", path: "M75 200 L125 200 L125 230 L75 230 Z" },
            { id: "inner-thigh-left", name: "Inner Thigh Left", path: "M90 230 L100 230 L100 280 L90 280 Z" },
            { id: "inner-thigh-right", name: "Inner Thigh Right", path: "M100 230 L110 230 L110 280 L100 280 Z" },
            { "id": "outer-thigh-left", "name": "Outer Thigh Left", "path": "M75 230 L90 230 L90 280 L75 280 Z" },
            { "id": "outer-thigh-right", "name": "Outer Thigh Right", "path": "M110 230 L125 230 L125 280 L110 280 Z" },
            { "id": "knees-left", "name": "Knees Left", "path": "M75 280 L95 280 L95 300 L75 300 Z" },
            { "id": "knees-right", "name": "Knees Right", "path": "M105 280 L125 280 L125 300 L105 300 Z" },
            { "id": "feet-left", "name": "Feet Left", "path": "M75 300 L95 300 L95 310 L75 310 Z" },
            { "id": "feet-right", "name": "Feet Right", "path": "M105 300 L125 300 L125 310 L105 310 Z" },
            { "id": "arms-left", "name": "Arms Left", "path": "M60 110 L70 110 L70 180 L60 180 Z" },
            { "id": "arms-right", "name": "Arms Right", "path": "M130 110 L140 110 L140 180 L130 180 Z" },
            { "id": "hands-left", "name": "Hands Left", "path": "M60 180 L70 180 L70 200 L60 200 Z" },
            { "id": "hands-right", "name": "Hands Right", "path": "M130 180 L140 180 L140 200 L130 200 Z" },
          ];
          
          const togglePart = (name) => {
            setSelectedParts(prev =>
              prev.includes(name) ? prev.filter(p => p !== name) : [...prev, name]
            );
          };

          const handleLogPain = () => {
            if (selectedParts.length === 0) return;
            const logData = { selectedParts, severity: severity[0] };
            
            const newLog = {
              id: Date.now(),
              locations: selectedParts,
              severity: severity[0],
              timestamp: new Date().toLocaleString('en-IN'),
            };
            setRecentLogs([newLog, ...recentLogs.slice(0, 2)]);
            
            onLogPain(logData); // Pass data to parent to switch page
            setSelectedParts([]);
            setSeverity([5]);
          };

          return (
            <div className="min-h-screen bg-pink-50 pb-20 px-4 pt-6">
              <div className="max-w-md mx-auto space-y-6">
                <div className="text-center">
                  <h1 className="text-3xl font-bold gradient-text font-poppins mb-2">Pain Tracker</h1>
                  <p className="text-gray-500">Select areas of pain on the body diagram below.</p>
                </div>

                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Interactive Body Map</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative mx-auto w-52 h-96 mb-4">
                      <svg viewBox="0 0 200 320" className="w-full h-full">
                        {bodyAreas.map(area => (
                          <path
                            key={area.id}
                            d={area.path}
                            fill={selectedParts.includes(area.name) ? "rgba(236, 72, 153, 0.7)" : "rgba(252, 211, 225, 0.5)"}
                            stroke="#db2777"
                            strokeWidth={1}
                            className="cursor-pointer transition-all duration-200 hover:fill-pink-400/70"
                            onClick={() => togglePart(area.name)}
                          />
                        ))}
                      </svg>
                    </div>

                    {selectedParts.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-800 mb-2">
                          Selected Areas ({selectedParts.length}):
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {selectedParts.map(part => (
                            <Badge key={part} variant="secondary" className="flex items-center gap-1.5">
                              {part}
                              <X className="w-3.5 h-3.5 cursor-pointer hover:text-red-600" onClick={() => togglePart(part)} />
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Pain Intensity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Level: {severity[0]}/10</Label>
                      <Slider value={severity} onValueChange={setSeverity} max={10} min={1} step={1} />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Mild</span>
                        <span>Moderate</span>
                        <span>Severe</span>
                      </div>
                    </div>
                    <Button onClick={handleLogPain} disabled={selectedParts.length === 0}>
                      Find Relief Solutions ({selectedParts.length})
                    </Button>
                  </CardContent>
                </Card>

                 {recentLogs.length > 0 && (
                  <Card className="glass">
                    <CardHeader><CardTitle>Recent Logs</CardTitle></CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {recentLogs.map(log => (
                          <div key={log.id} className="flex justify-between items-center p-3 rounded-lg bg-white/50">
                            <div>
                              <div className="flex flex-wrap gap-1 mb-1">
                                {log.locations.map((location) => (
                                  <Badge key={location} variant="outline" className="text-xs">{location}</Badge>
                                ))}
                              </div>
                              <p className="text-xs text-gray-500">{log.timestamp}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-gray-800">{log.severity}/10</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          );
        };

        // --- RELIEF SOLUTIONS PAGE ---
        const ReliefSolutionsPage = ({ painData, onBack }) => {
          const [solutions, setSolutions] = useState({});
          const { selectedParts = [], severity = 5 } = painData || {};

          useEffect(() => {
            if (!selectedParts || selectedParts.length === 0) return;

            const getSolutionsForPart = (bodyPart) => {
                const partMappings = {
                    'Knees Left': 'Knees Left',
                    'Knees Right': 'Knees Right',
                    'Inner Thigh Left': 'Inner Thigh Left',
                    'Inner Thigh Right': 'Inner Thigh Right',
                    'Outer Thigh Left': 'Outer Thigh Left',
                    'Outer Thigh Right': 'Outer Thigh Right',
                    'Abdomen': 'Abdomen',
                    'Hips': 'Hips',
                    'Lower Back': 'Lower Back',
                    'Upper Back': 'Upper Back',
                    'Head': 'Head',
                    'Neck': 'Neck',
                    'Shoulders': 'Shoulders',
                    'Chest': 'Chest',
                    'Arms Left': 'Arms Left',
                    'Arms Right': 'Arms Right',
                    'Hands Left': 'Hands Left',
                    'Hands Right': 'Hands Right',
                    'Feet Left': 'Feet Left',
                    'Feet Right': 'Feet Right',
                    'Left Breast': 'Left Breast',
                    'Right Breast': 'Right Breast'
                };

                const mappedPart = partMappings[bodyPart] || bodyPart;
            
                const relevantStretches = stretchesData.stretches.filter(s => s.body_part === mappedPart);
                const relevantFoodsEat = foodsEatData.foods_for_pain_relief.filter(f => f.benefits_areas.includes(mappedPart));
                const relevantFoodsAvoid = foodsDontEatData.foods_that_worsen_pain.filter(f => f.worsens_pain_in_areas.includes(mappedPart));
            
                return {
                    stretches: relevantStretches,
                    foodsToEat: relevantFoodsEat,
                    foodsToAvoid: relevantFoodsAvoid,
                };
            };

            const allSolutions = {};
            selectedParts.forEach(part => {
              allSolutions[part] = getSolutionsForPart(part);
            });
            setSolutions(allSolutions);
          }, [selectedParts]);
          
          if (selectedParts.length === 0) {
             return (
                <div className="p-4 text-center">
                    <p>No pain points selected.</p>
                    <Button onClick={onBack} className="mt-4 bg-pink-500 hover:bg-pink-600">Go Back</Button>
                </div>
             );
          }

          return (
            <div className="min-h-screen bg-pink-50 pb-20 px-4 pt-6">
                <div className="max-w-2xl mx-auto space-y-6">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold gradient-text font-poppins mb-2">Relief Solutions</h1>
                        <p className="text-gray-500">Recommendations based on your logged pain.</p>
                    </div>

                    {Object.keys(solutions).map(part => (
                        <Card key={part} className="glass">
                            <CardHeader>
                                <CardTitle>Recommendations for: <span className="text-pink-600">{part}</span></CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Stretches Section */}
                                {solutions[part].stretches.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-700 mb-3">Recommended Stretches</h3>
                                        <div className="space-y-3">
                                            {solutions[part].stretches.map(s => (
                                                <div key={s.stretch_name} className="p-3 rounded-lg bg-white/50">
                                                    <p className="font-semibold text-pink-700">{s.stretch_name}</p>
                                                    <p className="text-sm text-gray-600">{s.description}</p>
                                                    <p className="text-xs text-gray-500 italic mt-1">Benefit: {s.primary_benefit}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Foods to Eat Section */}
                                {solutions[part].foodsToEat.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-700 mb-3">Foods to Eat</h3>
                                         <div className="space-y-3">
                                            {solutions[part].foodsToEat.map(f => (
                                                <div key={f.food_category} className="p-3 rounded-lg bg-white/50">
                                                    <p className="font-semibold text-pink-700">{f.food_category} ({f.primary_action})</p>
                                                    <p className="text-sm text-gray-600">{f.specific_foods.join(", ")}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Foods to Avoid Section */}
                                {solutions[part].foodsToAvoid.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-700 mb-3">Foods to Limit or Avoid</h3>
                                         <div className="space-y-3">
                                            {solutions[part].foodsToAvoid.map(f => (
                                                <div key={f.food_category_to_limit} className="p-3 rounded-lg bg-white/50">
                                                    <p className="font-semibold text-pink-700">{f.food_category_to_limit} ({f.primary_negative_effect})</p>
                                                    <p className="text-sm text-gray-600">{f.specific_examples.join(", ")}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {solutions[part].stretches.length === 0 && solutions[part].foodsToEat.length === 0 && solutions[part].foodsToAvoid.length === 0 && (
                                   <p className="text-sm text-gray-500">No specific nutritional or stretch recommendations found for this area. Focus on general wellness, hydration, and anti-inflammatory foods.</p>
                                )}
                            </CardContent>
                        </Card>
                    ))}

                    <Button onClick={onBack} className="bg-gray-700 hover:bg-gray-800">
                        Back to Tracker
                    </Button>
                </div>
            </div>
          );
        };


        // --- MAIN APP COMPONENT ---
        const App = () => {
            const [currentPage, setCurrentPage] = useState('tracker'); // 'tracker' or 'solutions'
            const [painData, setPainData] = useState(null);

            const handleLogPain = (data) => {
                setPainData(data);
                setCurrentPage('solutions');
            };

            const handleBack = () => {
                setCurrentPage('tracker');
            };

            return (
                <div>
                    {currentPage === 'tracker' && <PainTrackerPage onLogPain={handleLogPain} />}
                    {currentPage === 'solutions' && <ReliefSolutionsPage painData={painData} onBack={handleBack} />}
                </div>
            );
        };

        const container = document.getElementById('root');
        const root = ReactDOM.createRoot(container);
        root.render(<App />);
    </script>
</body>
</html>
