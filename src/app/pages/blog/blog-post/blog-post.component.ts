import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.css'
})
export class BlogPostComponent implements OnInit {
  slug: string | null = null;
  article: any = null;

  articles: any[] = [
    {
      slug: 'why-personal-trainers-are-worth-it',
      title: 'Why Personal Trainers Are Worth It',
      category: 'Personal Training',
      date: 'August 21, 2024',
      image: 'images/why-personal-trainers-are-worth-it.png',
      content: {
        introduction: "In today's fast-paced world, staying fit and healthy can be challenging. Many people turn to personal trainers to help them achieve their fitness goals. But is hiring a personal trainer really worth it? Let's explore why personal trainers can be a valuable investment in your health.",
        sections: [
          {
            title: 'Personalized Workout Plans',
            content: "One of the main benefits of working with a personal trainer is the creation of a personalized workout plan. Unlike generic workout routines you might find online, a personal trainer tailors exercises to your specific needs and goals. Whether you aim to lose weight, build muscle, or improve your overall fitness, a personalized plan can make a significant difference."
          },
          {
            title: 'Proper Technique and Form',
            content: "Personal trainers are experts in exercise techniques and proper form. They ensure you perform exercises correctly to avoid injuries and maximize effectiveness. Incorrect form can lead to serious injuries and long-term health issues. With a personal trainer guiding you, you can be confident that you are exercising safely."
          },
          {
            title: 'Motivation and Accountability',
            content: "Staying motivated can be one of the biggest hurdles in maintaining a fitness routine. Personal trainers provide the encouragement and support you need to stay on track. They hold you accountable by setting realistic goals and tracking your progress. Knowing that someone is monitoring your progress can be a strong motivator to stick with your fitness plan."
          },
          {
            title: 'Efficient Workouts',
            content: "Time is a precious commodity, and personal trainers help you make the most of it. They design workouts that are efficient and effective, ensuring you get the best results in the shortest amount of time. With a well-structured plan, you can achieve more in a 30-minute session with a personal trainer than in an hour working out on your own."
          },
          {
            title: 'Customized Nutrition Advice',
            content: "Personal trainers often provide nutritional advice tailored to your fitness goals. They can help you create a balanced diet plan that complements your workouts and enhances your results. Proper nutrition is a crucial component of any fitness journey, and having expert guidance can make a significant difference."
          },
          {
            title: 'Adaptability and Flexibility',
            content: "Life is unpredictable, and sometimes your fitness routine needs to adapt. Personal trainers can adjust your workout plans to accommodate changes in your schedule, fitness level, or health conditions. This flexibility ensures that you can continue progressing toward your goals, no matter what life throws your way."
          },
          {
            title: 'Cost-Effective Investment',
            content: "While hiring a personal trainer may seem like a significant expense, it can be a cost-effective investment in the long run. The benefits of personalized training, injury prevention, and efficient workouts can save you time and money on medical bills and ineffective fitness programs. Additionally, the long-term health benefits can lead to a better quality of life."
          }
        ],
        conclusion: "In conclusion, personal trainers offer numerous advantages that make them worth the investment. From personalized workout plans to motivation and accountability, they provide the support you need to achieve your fitness goals efficiently and safely. If you're searching for \"personal trainers near me\" or considering Roure Personal Training, now is the time to take the leap and invest in your health.",
        callToAction: "Have you worked with a personal trainer before? Share your experiences in the comments below!"
      }
    },
    {
      slug: 'how-exercise-helps-to-relieve-stress',
      title: 'How exercise helps to relieve stress',
      category: 'Tips & Tricks',
      date: 'June 29, 2023',
      image: 'images/how-exercise-helps-to-relieve-stress-card.jpg',
      content: {
        introduction: "Along with making sure you get enough sleep, regular exercise is the most common advice we hear whenever we go through a stressful period. It is pretty much common knowledge that daily physical activity has a positive impact on our mental health, and that it plays a huge role in alleviating symptoms of stress – with immediate as well as long term effects. But how does that work, exactly? What is it that happens in our bodies when we work out, and how does that impact our stressed minds? In this article, we'll explain how exercise helps to relieve stress – scientifically.",
        sections: [
          {
            title: 'The connection between mind and body',
            content: "In our current day and age, mind and body are often regarded as two separate entities. In reality, they are connected in more ways than we can even comprehend. Our mental state has a huge impact on our physical health. When our brain is affected by stress, sooner or later our body will be affected as well. We could give many examples of the inseparable connection of mind and body. Think about how your heart rate increases and your breathing quickens when your brain registers a threat. How being madly in love with someone reduces your appetite. How being nervous before an important exam or a big presentation makes your stomach churn. These connections are not one-way streets – they also work the other way around. That means that when your body feels better, your mind feels better as well."
          },
          {
            title: 'How does exercise help to relieve stress?',
            content: "The benefits of exercise on mental health have been known for centuries. The Greek philosopher Plato even believed that \"exercise would cure a guilty conscience\". It may seem somewhat contradictory, since exercise is basically a form of physical stress. How does generating physical stress help to reduce mental stress? In order to explain that, we need to talk about neurotransmitters. These organic molecules are crucial for proper brain functioning. Exercise directly influences our neurochemistry in the following ways:"
          },
          {
            title: 'It reduces stress hormones',
            content: "Physical activity reduces the levels of stress hormones such as adrenaline and cortisol."
          },
          {
            title: 'It increases the production on endorphins',
            content: "Endorphins are the feel-good neurotransmitters; they are basically your body's own, natural pain killers and mood boosters. There are over twenty different types of endorphins; some of them have an effect that is even stronger than morphine."
          },
          {
            title: 'It creates a dopamine boost',
            content: "Endorphins work together with another crucial neurotransmitter: dopamine. This neural messenger, often referred to as the 'motivation molecule' is responsible for motivation and reward; it is what gives us that sense of satisfaction after accomplishing a task. It also plays a crucial role in our executive functions, attention-span, focus and our ability to experience pleasure."
          },
          {
            title: 'It ensures a healthy serotonin balance',
            content: "Physical activity results in an increased release and synthesis of serotonin. This neurotransmitter is involved in many physiological processes relating to sleep, body temperature regulation, muscle control, appetite and digestion and libido. Serotonin also helps to stabilize your mood and well-being."
          },
          {
            title: 'Beyond neurochemicals',
            content: "The above has all been scientifically proven, so you don't have to take our word for it. But the ways that exercise helps to relieve stress are not limited to how they influence our neurotransmitters. There are also emotional, behavioral and social factors that come into play. If you have been overweight, for example, and you start a regular workout regimen with a personal trainer, seeing and feeling how you're losing excess fat and toning up will improve your self-image, confidence and pride. Along the same lines, an individual who has been dealing with insecurity, feelings of weakness and a lack of self-discipline will see significant improvement in these areas when they start weight training or martial arts. We see ourselves improve, and it often doesn't take very long for others to notice it as well. The discipline, drive and energy that we get from exercising regularly tend to create a butterfly effect and help us to achieve our other goals in life. This in itself does not only reduce our overall stress levels but also enables us to handle stress better – it makes us more resilient. And since we can't always prevent life from throwing stress-inducing events our way, we better make sure we are resilient enough to deal with it."
          }
        ],
        conclusion: '',
        callToAction: ''
      }
    },
    {
      slug: 'how-much-water-should-you-drink',
      title: 'How much water should you drink before, during and after training?',
      category: 'Tips & Tricks',
      date: 'May 14, 2023',
      image: 'images/hydration-before-during-after-workout-card.jpg',
      content: {
        introduction: "We probably don't need to tell you how important it is to drink enough water every day. When you're working up a sweat, proper hydration is even more crucial. But having a belly full of sloshing water during an intense workout is not very comfortable either. So how do you know whether you're actually drinking enough water? And how much water should you drink before, during and after training?",
        sections: [
          {
            title: 'What are the symptoms of dehydration?',
            content: "Did you know that around 60% of the human body consists of water? When you fail to replenish the fluids that you lose, you are more susceptible to overheating. Your blood thickens. Your heart has to work harder in order to pump blood through your body. Muscle contractions become increasingly more difficult. You're no longer able to efficiently absorb nutrients from food and supplements. Your body's ability to filter and flush out toxins decreases. Your system will try to hold on to whatever fluids there are left, causing you to feel bloated and uncomfortable. And you get thirsty."
          },
          {
            title: 'How much water should you drink before, during and after training?',
            content: "A lot of people forget to drink enough water. It's usually not until we start to feel thirsty that we think: \"I should probably drink some water.\" But if you don't drink until you are thirsty, you're actually too late. Ideally, you should drink enough during the day to prevent getting thirsty in the first place. When you're training, you want to stay hydrated and at the same time prevent yourself from drinking so much that it hinders your workout."
          },
          {
            title: 'Before training',
            content: "When empty, the human stomach is around the size of a fist. However, it can stretch to hold more than you might think. Unless you spend years stretching out your stomach by overeating, your stomach can hold around one to two litres of fluid. That doesn't mean that you should go exercise with that much water in your stomach, but starting out dehydrated is not a good idea either. The American Council on Exercise recommends drinking around half a litre of water in the two hours before your workout. In the last 30 minutes before you start, add another 200 millilitres."
          },
          {
            title: 'During training',
            content: "While you definitely need to prevent dehydration during training, drinking too much water in between will almost certainly have a negative effect on your performance. Nobody wants to do a martial arts class, run a couple of miles or lift heavy weights with a litre or two of water sloshing around! If you're sweating heavily during a longer workout, however, you need to make sure you replenish the fluids and electrolytes that you're losing. The best thing is to take small sips in between; around 200 millilitres per 20 minutes."
          },
          {
            title: 'After training',
            content: "After training is when your body is most efficient in taking up fluids. How much you should drink, depends on how much you lost during your workout. If you're not sure whether you're drinking enough, you could try to weigh yourself before and after a workout. A good rule of thumb is to drink up to half a litre of water for every pound that you've lost afterwards."
          },
          {
            title: 'Final thoughts',
            content: "If you're having trouble staying hydrated (like so many of us), buy yourself a cute water bottle and get into the habit of bringing it everywhere with you – including the gym. When you're properly hydrated, you'll be able to get the most out of your workouts. And we can promise you that you'll feel a lot better!"
          }
        ],
        conclusion: '',
        callToAction: "You may also like: What happens when you work out with a hangover?"
      }
    },
    {
      slug: 'static-stretching-vs-dynamic-stretching',
      title: 'Static stretching vs dynamic stretching: an introduction',
      category: 'Exercises',
      date: 'February 14, 2023',
      image: 'images/static-stretching-vs-dynamic-stretching-an-introduction-card.jpg',
      content: {
        introduction: "We all know that stretching is important. However, not all stretches are equal. In this blogpost we'll shed a light on static stretching versus dynamic stretching. What is the difference between these two types of stretching? And is it better to do them before or after your workout?",
        sections: [
          {
            title: 'What is static stretching?',
            content: "Static stretching refers to stretching exercises where you stretch a muscle or group of muscles by holding a single position for a relatively long time (usually between 15 or 60 seconds, sometimes longer). Some examples of static stretches: Standing quadriceps stretch, Static tricep stretch, Butterfly stretch."
          },
          {
            title: 'What is dynamic stretching?',
            content: "Dynamic stretching is considered more functionally oriented way of stretching. It refers to specific controlled (usually repetitive) movements focused on actively increased the range of motion, but without holding a position or stopping at an endpoint. Some examples of dynamic stretches: Leg sweeps, Downward dog to cobra, Runner's lunge with twist."
          },
          {
            title: 'Static stretching vs dynamic stretching',
            content: "Static stretching got somewhat of a bad reputation during the 1980's, when published studies indicated that doing static stretches before a workout had a negative impact on performance. There is some truth in this. If you move a joint past your range of motion and hold it for a longer period of time and then immediately start exercising without doing a contra-stretch for that muscle(group), it makes sense to experience a temporary decrease in muscle power, explosive strength and speed. That said, there is absolutely a time and a place for static stretching. Recent studies suggest that doing static stretches as part of your cooling down, is an excellent way to combat post-workout stiffness and sore muscles. Doing it regularly also increases your flexibility and range of motion in the long run. Most dynamic stretches are designed to mimic the movements you make during your workout – which is why there are a lot of differences between recommended dynamic stretches for different sports). Dynamic stretches are primarily done as part of the warming up and help to prepare and activate the muscles for the activities you're about to do. The movements also increase the blood flow and raise the temperature of the muscles, which helps to prevent injuries. Numerous studies have shown that dynamic stretching pre-workout has a positive effect on power and performance."
          },
          {
            title: 'Final thoughts',
            content: "In theory, it comes down to dynamic stretching during the warming up and static stretches during the cooling down. In practise, it's not that black and white – a lot of static stretches can be tweaked to make them dynamic and suitable for warming up. Keep in mind that everyone is different. Whether you're performing static or dynamic stretches, you should always listen to your body. Stretching is never supposed to hurt! If it does, ask your personal trainer for advice."
          }
        ],
        conclusion: '',
        callToAction: ''
      }
    },
    {
      slug: 'mindful-exercise-mindfulness-workouts',
      title: 'Mindful exercise: How to bring more mindfulness into your workouts',
      category: 'Exercises',
      date: 'January 10, 2023',
      image: 'images/mindful-exercise-workout-routine-card.jpg',
      content: {
        introduction: "Let's get one thing straight: there is absolutely nothing wrong with putting in your AirPods and listening to some tunes when you're going for a run. There is also nothing wrong with zoning out while you're sweating your ass off on the elliptical. And be honest, mindlessly hitting a punching bag is great for releasing negative emotions. However, if you're always on autopilot, you're missing out. Constantly being distracted during workouts means disconnecting with your body. This results in your exercises being less effective, which will inevitably lead to hitting a plateau, slowed progress or no progress at all. Therefore, I'd like to challenge you to switch up your mindless workouts with mindful exercise.",
        sections: [
          {
            title: 'The benefits of mindful exercise',
            content: "Mindful exercise can help to increase your performance, improve your form and technique and prevent injuries. Being present during your workout means moving with intention. This really enables you to tune into your body and get a better understanding about what's going on during the exercises that you do. Not just physically, but also mentally. This will increase the release of endorphins, those chemicals that make you feel so good during and after training. Regularly working up a good sweat in a mindful way will also help you to stick to your workout plan and ultimately reach your fitness goals."
          },
          {
            title: 'How to bring more mindfulness into your workouts',
            content: "Below, we've listed five tips to help you bring more mindfulness into your workouts:"
          },
          {
            title: '#1. Start every workout by setting an intention',
            content: "Mindful exercise starts before your workout. Take a minute or so before you start to set an intention for this specific training. It can be something like \"I will stay present and aware during this workout\", \"I will find joy in every exercise I perform today\" or \"I will make the barbell my **** today\". It can be easy to forget your intention once you get going, especially if you have a habit of 'going through the motions'. If you're doing a home workout, you can write your intention on a piece of paper and stick it to your mat. If you're going to the gym, you can write a reminder on your wrist."
          },
          {
            title: '#2. Focus on your breath',
            content: "You may have seen this one coming, but it's one of the best ways to practise mindful exercise. If you're doing cardio, you have to focus on your breath. If you don't, you're not going to get far – or you'll be forced to terminate your workout because of side pains and cramps. When you finish a session, how long does it take you to get your breath back to normal? But even when you're doing (body)weight training, it is good to pay attention to your breath. How ARE you breathing now? Are you breathing in through your nose and out through your mouth? In and out at the right moments? When you're doing push ups, are you breathing out at the top of your push up or when you lower down? How about with deadlifts?"
          },
          {
            title: '#3. Pay more attention to your body during your workout',
            content: "Mindful exercise can be challenging at first, especially when you're so used to zoning out and going through the motions. But being mindful is something you can train, just like your muscles. Once you notice your mind starts to wander to last night's date or tomorrow's to-do list, gently bring your awareness back to your exercise."
          },
          {
            title: '#4. Create room for workouts without distractions',
            content: "Like we mentioned before, it's totally okay to alternate with workouts where you just zone out and go without thinking. But make sure to also create space for mindful exercise. It's up to you how you want to shape those. It might be a quiet home workout in solitude. Or going for a run without your headphones, and listening to the sounds of your own footsteps, your own breathing, the birds, the wind, the rustling leaves. It's a completely different experience."
          },
          {
            title: '#5. Check in with yourself afterwards',
            content: "Many of us have a tendency of diving right back into their daily routine after they're done working out. But a more mindful approach to fitness works best if you take some time after your workout to check in with yourself. This doesn't have to take long. You can, for example, reflect on your workout when you're in the shower, or while you're doing a cooldown with some stretches, or when you're walking home from the gym. For those who are really dedicated: buy yourself a pretty notebook and write down a few lines about what you did during your workout, how you feel now, and what you want to work on next time."
          }
        ],
        conclusion: '',
        callToAction: ''
      }
    },
    {
      slug: 'building-strength-comprehensive-guide',
      title: '22 fascinating facts about muscles',
      category: 'Personal Training',
      date: 'December 5, 2023',
      image: 'images/fascinating-facts-about-muscles-card.jpg',
      content: {
        introduction: "When you're getting personal training with us (or are considering it), you're probably already paying a lot of attention to muscle development. But how much do you actually know about your muscles? We'd recommend finding some time to do a deep dive and expand your knowledge. The more you know about how your muscles work, the easier it will be to develop them and reach your personal fitness goals. To help you get started, we've listed 22 interesting facts about muscles. Some fun facts can also be used to impress that cutie you've been eyeing!",
        sections: [
          {
            title: 'Fascinating facts about muscles that you should know about',
            content: ''
          },
          {
            title: '#1. While it depends on how you count, the human body contains between 600 and 700 skeletal muscles',
            content: "These are the muscles responsible for maintaining your posture. They provide structural support and enable your body to move."
          },
          {
            title: '#2. If all of the skeletal muscles you have in your body could pull in one direction, you would have the ability to lift around 25 tons of weight',
            content: ''
          },
          {
            title: '#3. Aside from skeletal muscles, you also have so-called smooth muscles',
            content: "Examples of smooth muscles are those responsible for certain sensory processes (like the expansion and contraction of your pupils) and the functioning of your respiratory and digestive system."
          },
          {
            title: '#4. There is also the cardiac muscle, the hardest working muscle in the human body',
            content: "It is also the only muscle that never gets tired."
          },
          {
            title: '#5. Around 35 to 40 percent of your body weight is made up of muscle tissue',
            content: ''
          },
          {
            title: '#6. The biggest skeletal muscle in your body is the gluteus maximus',
            content: "Yes, we're talking about your butt. Or more specifically, one of the three different muscles in your butt. Without the gluteus maximus, you wouldn't even be able to walk up straight."
          },
          {
            title: '#7. The smallest muscle in your body is called the stapedius',
            content: "It is located in your middle ear and serves to protect the inner ear from high levels of noise by controlling the amplitude of soundwaves, like an internal volume control. Because its reflex is relatively slow, the risk of damaging your hearing is significantly greater when you're exposed to sudden sounds such as explosions or gunshots. Without a stapedius, we would be constantly overwhelmed by the sound of our own voice. This tiny muscle is also the reason why listening to recordings of your own voice always sound so weird."
          },
          {
            title: '#8. If us humans had the ability to hear frequencies below 20 Hz, we would actually hear our muscles moving',
            content: ''
          },
          {
            title: '#9. Your tongue is the only muscle in your entire body that is attached on only one side',
            content: ''
          },
          {
            title: '#10. Your fingers are made out of bones, ligaments and tendons',
            content: "That's right, there are no muscles in your fingers. Our forearm muscles 'pulling' on the tendons are what enables us to move them."
          },
          {
            title: '#11. There are no muscles as active as your eye muscles',
            content: "They easily get over 100.000 movements per day!"
          },
          {
            title: '#12. The longest muscle in the human body is the sartorius',
            content: "It is the muscle that runs over the length of your upper thigh to the inside of your knee."
          },
          {
            title: '#13. The widest muscle that you have is the latissimus dorsi',
            content: "This muscle works together with several other muscles to enable your shoulders to move. However, you also use your lats during deep breathing, as well as when you're coughing."
          },
          {
            title: '#14. Gaining muscle does not actually happen in the gym',
            content: "It happens when you sleep. This is when your body produces the chemicals that are responsible for repairing muscle tissue – a crucial element in building muscle mass."
          },
          {
            title: '#15. While it may not always be obvious, muscle mass is gained much quicker than it is lost',
            content: "Research has shown that taking a two month break from training results in around 23 percent muscle loss. However, if you do spend two months on training, you could gain around 47 percent of muscle."
          },
          {
            title: '#16. If you started training because you wanted to lose some weight and find out a couple of weeks later that you actually gained weight, that makes sense',
            content: "After all, muscles are heavier than fat. To be more specific: one cubic inch of muscle weighs three times as much as a cubic inch of fat. This is why the number on the scale is not always as relevant as many people think."
          },
          {
            title: '#17. Muscle may weigh three times as much as fat, it is also three times more efficient when it comes to burning calories',
            content: "Your body burns around 50 extra calories per day for every pound of muscle that you gain."
          },
          {
            title: '#18. Muscle contractions generate a whopping 85 percent of our body heat',
            content: "Any time you feel cold, your muscles will contract. This happens involuntarily, so you can't really control it. The colder you feel, the more intense these contractions will get. That is why humans shiver when they're freezing!"
          },
          {
            title: '#19. Recovery is just as important for your muscles as training',
            content: "If you don't give your muscles the time to recover after a heavy workout, they are significantly more susceptible to injuries."
          },
          {
            title: '#20. Aside from rest, our muscles also require protein to repair themselves',
            content: "Depending on your activity level, around 10 tot 35 percent of the calories you consume should come from protein."
          },
          {
            title: '#21. Dehydration has a negative impact on your muscles\' self-repairing abilities',
            content: "It's always important to drink plenty of water during the day, but even more so when you feel sore after a workout!"
          },
          {
            title: '#22. We have all experienced the so-called \'hypnic jerk\'',
            content: "It's when you feel like you're falling when you're drifting off to sleep. This seemingly strange phenomenon is actually a misinterpretation of the brain due to the fact that your muscles are starting to relax. The sudden muscle contractions that occur during the 'fall' are simply caused by the signals that your brain send to your limbs in an attempt to regain balance."
          }
        ],
        conclusion: '',
        callToAction: ''
      }
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.slug = params.get('slug');
      if (this.slug) {
        this.article = this.articles.find(a => a.slug === this.slug);
        if (!this.article) {
          // Redirect to blog if article not found
          void this.router.navigate(['/blog']);
        }
      }
    });
  }
}

