<?php

namespace eclore\userBundle\Admin;

use Sonata\AdminBundle\Admin\Admin;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Show\ShowMapper;
use eclore\userBundle\Form\ImageType;

class NewsPostAdmin extends Admin
{
    /**
     * @param ListMapper $listMapper
     */
    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
            ->add('title')
            ->add('publishDate')
            ->add('endDate')
            ->add('header')
            ->add('text')
            ->add('pictures', 'entity', array('class'=>'ecloreuserBundle:Image',
            'multiple'=>true, 'required' =>false))
            ->add('_action', 'actions', array(
                'actions' => array(
                    'show' => array(),
                    'edit' => array(),
                    'delete' => array(),
                )
            ))
        ;
    }

    /**
     * @param FormMapper $formMapper
     */
    protected function configureFormFields(FormMapper $formMapper)
    {
        $images = $this->getSubject()->getPictures();
        $fileFieldOptions = array('type'         => new ImageType(),
                                              'allow_add'    => true,
                                              'allow_delete' => true,
                                              'required' => false,
                                              'by_reference' => false,
                                              'help'=>'');
        foreach($images as $image)
            if ($image && ($webPath = $image->getWebPath())) {
                $container = $this->getConfigurationPool()->getContainer();
                $fullPath = $container->get('request')->getBasePath().'/'.$webPath;
                $fileFieldOptions['help'] .= '<img src="'.$fullPath.'" class="admin-preview" />';
            }
            
        $formMapper
            ->add('title')
            ->add('publishDate')
            ->add('endDate')
            ->add('header')
            ->add('text')
            ->add('pictures', 'collection', $fileFieldOptions) 
        ;
    }

    /**
     * @param ShowMapper $showMapper
     */
    protected function configureShowFields(ShowMapper $showMapper)
    {
        $showMapper
            ->add('title')
            ->add('publishDate')
            ->add('endDate')
            ->add('header')
            ->add('text')
            ->add('pictures', 'entity', array('class'=>'ecloreuserBundle:Image',
            'multiple'=>true, 'required' =>false, 'template' => 'ecloreuserBundle:Admin:show_album_pictures.html.twig'))   
        ;
    }
}
