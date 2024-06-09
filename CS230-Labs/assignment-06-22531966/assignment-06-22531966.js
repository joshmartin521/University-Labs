const express = require('express');
const mongoose = require('mongoose');
const { type } = require('os');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://user:0987654321@cluster0.gr5lpje.mongodb.net/Gym')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

//member schema
const memberSchema = new mongoose.Schema({
    //unique id for each member
    id: {type: Number, unique: true ,required: true},
    title: {type: String, enum: ['Mr', 'Mrs', 'Ms', 'Mx', 'Dr', 'Miss', 'Other']},
    "first name": {type: String, required: true},
    "last name": {type: String, required: true},
    email: {type: String, unique: true ,required: true},
    "premium member": {type: Boolean, required: true}
}, { collection: 'Members' });

const Member = mongoose.model('Member', memberSchema);

//class schema
const classSchema = new mongoose.Schema({
    id: {type: Number, unique: true ,required: true},
    name: {type: String, required: true},
    day: {type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']},
    length: {type: Number, required: true},
    price: {type: Number, required: true},
    members: {type: Number, required: true},
}, { collection: 'Classes' });

const Class = mongoose.model('Class', classSchema);

//member class relationship, member must take 3 classes
const memberClassSchema = new mongoose.Schema({
    member_id: {
        type: Number,
        required: true,
        unique: true,
        validate: {
            validator: async function(value) {
                // Check if the member_id exists in the Members collection
                const member = await mongoose.model('Member').findOne({ id: value });
                return member
            },
            message: 'Invalid member_id'
        }
    },
    class_ids: {
        type: [Number],
        validate: [
            {
                validator: arrayLimit,
                message: 'member must take 3 classes'
            },
            {
                validator: async function(value) {
                    // Check if all class_ids exist in the Classes collection
                    const classes = await mongoose.model('Class').find({ id: { $in: value }});
                    return classes.length === value.length;
                },
                message: 'Invalid class_ids'
            }
        ]
    }
}, { collection: 'Members-Classes'});

function arrayLimit(val) {
    return val.length === 3;
}

const MemberClass = mongoose.model('MemberClass', memberClassSchema);


//get all members, classes and members-classes
app.get('/AllMembers', async (req, res) => {
    const members = await Member.find({});
    res.send(members);
});

app.get('/AllClasses', async (req, res) => {
    const classes = await Class.find({});
    res.send(classes);
});

app.get('/AllMembersClasses', async (req, res) => {
    const membersClasses = await MemberClass.find({});
    res.send(membersClasses);
});

//create new member, class and member-class
app.post('/member', async (req, res) => {
    try{
        const member = new Member({
            id: req.body.id,
            title: req.body.title,
            "first name": req.body["first name"],
            "last name": req.body["last name"],
            email: req.body.email,
            "premium member": req.body["premium member"]
        });
            await member.save();
            res.send(member);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
});

app.post('/class', async (req, res) => {
    try{
        const classs = new Class({
            id: req.body.id,
            name: req.body.name,
            day: req.body.day,
            length: req.body.length,
            price: req.body.price,
            members: req.body.members
        });
            await classs.save();
            res.send(classs);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
});

app.post('/memberclass', async (req, res) => {
    try{
        const memberclass = new MemberClass({
            member_id: req.body.member_id,
            class_ids: req.body.class_ids
        });
              // Check if all class_ids exist in the Classes collection
            const classes = await Class.find({ id: { $in: req.body.class_ids }});
            if (classes.length !== req.body.class_ids.length) {
                return res.status(400).send('Invalid class_ids');
            }
            await memberclass.save();
            res.send(memberclass);
    }catch (err) {
        res.status(400).send(err.message);
    }
}
);

//update member, class and member-class
app.put('/member/:id', async (req, res) => {
    try {
        const member = await Member.findOne({ id: req.params.id });
        if (!member) {
            return res.status(404).send('Member not found');
        }
        member.set({
            title: req.body.title,
            "first name": req.body["first name"],
            "last name": req.body["last name"],
            email: req.body.email,
            "premium member": req.body["premium member"]
        });
        await member.save();
        res.send(member);
    } catch (err) {
        res.status(400).send(err.message);
    }
}
);

app.put('/class/:id', async (req, res) => {
    try {
        const classs = await Class.findOne({ id: req.params.id });
        if (!classs) {
            return res.status(404).send('Class not found');
        }
        classs.set({
            name: req.body.name,
            day: req.body.day,
            length: req.body.length,
            price: req.body.price,
            members: req.body.members
        });
        await classs.save();
        res.send(classs);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

app.put('/memberclass/:id', async (req, res) => {
    try {
        const memberclass = await MemberClass.findOne({ member_id: req.params.id });
        if (!memberclass) {
            return res.status(404).send('MemberClass not found');
        }
        memberclass.set({
            class_ids: req.body.class_ids
        });
        await memberclass.save();
        res.send(memberclass);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

//delete member, class and member-class
app.delete('/member/:id', async (req, res) => {
    try {
        const member = await Member.findOne({ id: req.params.id });
        if (!member) {
            return res.status(404).send('Member not found');
        }
        await Member.deleteOne({id: req.params.id});
        res.send(member);
    } catch (err) {
        res.status(400).send(err.message);
    }
}
);

app.delete('/class/:id', async (req, res) => {
    try {
        const classs = await Class.findOne({ id: req.params.id });
        if (!classs) {
            return res.status(404).send('Class not found');
        }
        await classs.deleteOne({id: req.params.id});
        res.send(classs);
    } catch (err) {
        res.status(400).send(err.message);
    }
}
);

app.delete('/memberclass/:id', async (req, res) => {
    try{
        const memberclass = await MemberClass.findOne({ member_id: req.params.id });
        if (!memberclass) {
            return res.status(404).send('MemberClass not found');
        }
        await memberclass.deleteOne({member_id: req.params.id});
        res.send(memberclass);
    }catch (err) {
        res.status(400).send(err.message);
    }
}); 

//get member, class and member-class by id
app.get('/member/:id', async (req, res) => {
    try {
        const member = await Member.findOne({ id: req.params.id });
        if (!member) {
            return res.status(404).send('Member not found');
        }
        res.send(member);
    } catch (err) {
        res.status(400).send(err.message);
    }
}
);

app.get('/class/:id', async (req, res) => {
    try {
        const classs = await Class.findOne({ id: req.params.id });
        if (!classs) {
            return res.status(404).send('Class not found');
        }
        res.send(classs);
    } catch (err) {
        res.status(400).send(err.message);
    }
}
);

app.get('/memberclass/:id', async (req, res) => {
    try{
        const memberclass = await MemberClass.findOne({ member_id: req.params.id });
        if (!memberclass) {
            return res.status(404).send('MemberClass not found');
        }
        res.send(memberclass);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
}
);



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});