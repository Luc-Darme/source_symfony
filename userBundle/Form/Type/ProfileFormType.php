<?php

namespace eclore\userBundle\Form\Type;

use Symfony\Component\Form\FormBuilderInterface;
use FOS\UserBundle\Form\Type\ProfileFormType as BaseType;
use eclore\userBundle\Form\ImageType;
use Symfony\Component\DependencyInjection\Container;

class ProfileFormType extends BaseType
{

    protected $container;
     
    public function __construct($user_class, Container $container)
    {
        parent::__construct($user_class);
        $this->container = $container;
    }
    
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        
        $builder->add('birthDate', 'date', array( 'widget' => 'choice', 'years'=>range((int)date("Y")-100, (int)date("Y"))))
                ->add('lastName')
                ->add('firstName')
                ->add('mobile')
                ->add('quality')
                ->add('privacyLevel', 'choice', array('choices'=>$this->container->getParameter('privacyLevels')))
                ->add('headshot', new ImageType())
                ;
    }

    public function getName()
    {
        return 'eclore_user_profile';
    }
}

?>